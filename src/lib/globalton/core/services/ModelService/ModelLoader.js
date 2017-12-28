"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../../utils/assert");
var ModelLoader = (function () {
    function ModelLoader(modelService) {
        this.modelService = modelService;
    }
    /*
     Loads queried object rawdata into the model instance m
     */
    ModelLoader.prototype.loadObject = function (rawdata, m) {
        for (var key in rawdata) {
            var val = rawdata[key];
            m[key] = val;
        }
    };
    ModelLoader.prototype.populate = function (m, populate, source) {
    };
    ModelLoader.prototype.get = function (modelType, raw, source, options) {
        assert_1.Assert.exists(raw, "ModelLoader get has no raw data");
        assert_1.Assert.exists(modelType, "ModelLoader: get has no modelType");
        var m = this.modelService.getInstance(modelType, raw);
        this.modelService.consoleService.load("ModelLoader:get", m);
        return m;
    };
    ModelLoader.prototype.getAll = function (modelType, raws, source, options) {
        options = options || {};
        var res = [];
        for (var i in raws) {
            res.push(this.get(modelType, raws[i], source, options));
        }
        return res;
    };
    return ModelLoader;
}());
exports.ModelLoader = ModelLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWxMb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNb2RlbExvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLDZDQUF5QztBQUV6QztJQUVJLHFCQUFxQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUUvQyxDQUFDO0lBR0Q7O09BRUc7SUFDSCxnQ0FBVSxHQUFWLFVBQWMsT0FBWSxFQUFFLENBQUk7UUFFNUIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFdkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxDQUFRLEVBQUUsUUFBcUQsRUFBRSxNQUFlO0lBRXpGLENBQUM7SUFFRCx5QkFBRyxHQUFILFVBQXFCLFNBQW9CLEVBQUUsR0FBUSxFQUFFLE1BQWUsRUFBRSxPQUE2QjtRQUMvRixlQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3RELGVBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLEdBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUksU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELDRCQUFNLEdBQU4sVUFBd0IsU0FBb0IsRUFBRSxJQUFhLEVBQUUsTUFBZSxFQUFFLE9BQTZCO1FBQ3ZHLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQztRQUNsQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQztBQXRDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge01vZGVsVHlwZSwgT2JqZWN0SWQsIFJhdywgIFJhd0hhc2gsIFJlcXVlc3RRdWVyeU9wdGlvbnMsIFF1ZXJ5UG9wdWxhdGVPcHRpb259IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIlxyXG5pbXBvcnQge01vZGVsfSBmcm9tIFwiLi4vLi4vbW9kZWxzL01vZGVsXCI7XHJcbmltcG9ydCB7TW9kZWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbW9kZWwuc2VydmljZVwiXHJcbmltcG9ydCB7QXNzZXJ0fSBmcm9tIFwiLi4vLi4vdXRpbHMvYXNzZXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RlbExvYWRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgbW9kZWxTZXJ2aWNlOiBNb2RlbFNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgTG9hZHMgcXVlcmllZCBvYmplY3QgcmF3ZGF0YSBpbnRvIHRoZSBtb2RlbCBpbnN0YW5jZSBtXHJcbiAgICAgKi9cclxuICAgIGxvYWRPYmplY3Q8VD4ocmF3ZGF0YTogUmF3LCBtOiBUKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiByYXdkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSByYXdkYXRhW2tleV07XHJcblxyXG4gICAgICAgICAgICBtW2tleV0gPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBvcHVsYXRlKG06IE1vZGVsLCBwb3B1bGF0ZTogUXVlcnlQb3B1bGF0ZU9wdGlvbiB8IFF1ZXJ5UG9wdWxhdGVPcHRpb25bXSwgc291cmNlOiBSYXdIYXNoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldDxUIGV4dGVuZHMgTW9kZWw+KG1vZGVsVHlwZTogTW9kZWxUeXBlLCByYXc6IFJhdywgc291cmNlOiBSYXdIYXNoLCBvcHRpb25zPzogUmVxdWVzdFF1ZXJ5T3B0aW9ucyk6IFQge1xyXG4gICAgICAgIEFzc2VydC5leGlzdHMocmF3LCBcIk1vZGVsTG9hZGVyIGdldCBoYXMgbm8gcmF3IGRhdGFcIik7XHJcbiAgICAgICAgQXNzZXJ0LmV4aXN0cyhtb2RlbFR5cGUsIFwiTW9kZWxMb2FkZXI6IGdldCBoYXMgbm8gbW9kZWxUeXBlXCIpO1xyXG4gICAgICAgIGxldCBtOiBUID0gdGhpcy5tb2RlbFNlcnZpY2UuZ2V0SW5zdGFuY2U8VD4obW9kZWxUeXBlLCByYXcpO1xyXG4gICAgICAgIHRoaXMubW9kZWxTZXJ2aWNlLmNvbnNvbGVTZXJ2aWNlLmxvYWQoXCJNb2RlbExvYWRlcjpnZXRcIiwgbSk7XHJcbiAgICAgICAgcmV0dXJuIG07XHJcbiAgICB9XHJcbiAgICBnZXRBbGw8VCBleHRlbmRzIE1vZGVsPihtb2RlbFR5cGU6IE1vZGVsVHlwZSwgcmF3czogUmF3SGFzaCwgc291cmNlOiBSYXdIYXNoLCBvcHRpb25zPzogUmVxdWVzdFF1ZXJ5T3B0aW9ucyk6IFRbXSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgdmFyIHJlczogVFtdID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiByYXdzKSB7XHJcbiAgICAgICAgICAgIHJlcy5wdXNoKHRoaXMuZ2V0PFQ+KG1vZGVsVHlwZSwgcmF3c1tpXSwgc291cmNlLCBvcHRpb25zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbn0iXX0=