extern crate iron;
extern crate time;
extern crate router;
extern crate chrono;
extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;
extern crate reqwest;
extern crate job_scheduler;
extern crate staticfile;
extern crate mount;

use iron::prelude::*;
use iron::{BeforeMiddleware, AfterMiddleware, typemap};
use time::precise_time_ns;
use std::thread;
use iron::status;
use std::fs::File;
use std::io::prelude::*;
use router::{Router, NoRoute};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use std::path::Path;

use iron::Iron;
use staticfile::Static;
use mount::Mount;
struct ResponseTime;

impl typemap::Key for ResponseTime { type Value = u64; }

struct Custom404;

impl BeforeMiddleware for ResponseTime {
    fn before(&self, req: &mut Request) -> IronResult<()> {
        req.extensions.insert::<ResponseTime>(precise_time_ns());
        Ok(())
    }
}

impl AfterMiddleware for ResponseTime {
    fn after(&self, req: &mut Request, res: Response) -> IronResult<Response> {
        let delta = precise_time_ns() - *req.extensions.get::<ResponseTime>().unwrap();
        println!("{} Request took: {} ms", req.url, (delta as f64) / 1000000.0);
        Ok(res)
    }
}

impl AfterMiddleware for Custom404 {
    fn catch(&self, _: &mut Request, err: IronError) -> IronResult<Response> {
        println!("Hitting custom 404 middleware");

        if err.error.is::<NoRoute>() {
            Ok(Response::with((status::NotFound, "404")))
        } else {
            Err(err)
        }
    }
}

fn main() {

        //HTTP
        println!("Coinamics App Server");
        let mut router = Router::new();
        router.get("/", handler_simple, "index");
        router.get("/favicon.ico", handler_favicon, "favicon");

        let mut chain = Chain::new(router);
        chain.link_before(ResponseTime);
        chain.link_after(ResponseTime);
        chain.link_after(Custom404);


    let mut mount = Mount::new();
    mount.mount("/", Static::new(Path::new("../dist")));

    static http_port: i32 = 8090;
    let address = format!("0.0.0.0:{}",http_port);
    if let Ok(server) = Iron::new(mount).http(address.to_string()) {
        println!("HTTP server listening on {}", address);
    } else {
        println!("HTTP server could not connect on {}", address);
    }
}

fn handler_simple(_req: &mut Request) -> IronResult<Response> {
    Ok(Response::with((status::Ok, "Up")))
}

fn handler_favicon(_req: &mut Request) -> IronResult<Response> {
    Ok(Response::with((status::Ok, "Favicon")))
}