"use strict";
// https://en.wikipedia.org/wiki/ISO_8601
// Example
//    Usage: {{ dateValue | unicodeToDate | date:'MM/dd/yyyy' }}
//    Data: 2014-01-05T18:14:18.32
//    Result: 01/05/2014
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var IsoToDatePipe = (function () {
    function IsoToDatePipe() {
    }
    IsoToDatePipe.prototype.transform = function (value, args) {
        console.log("date", value);
        if (!value)
            return new Date();
        return new Date(value);
    };
    return IsoToDatePipe;
}());
IsoToDatePipe = __decorate([
    core_1.Pipe({ name: 'isotodate' })
], IsoToDatePipe);
exports.IsoToDatePipe = IsoToDatePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvdG9kYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpc290b2RhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLFVBQVU7QUFDVixnRUFBZ0U7QUFDaEUsa0NBQWtDO0FBQ2xDLHdCQUF3Qjs7QUFFeEIsc0NBQW1DO0FBR25DLElBQWEsYUFBYTtJQUExQjtJQU1BLENBQUM7SUFMQyxpQ0FBUyxHQUFULFVBQVUsS0FBWSxFQUFFLElBQWE7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxhQUFhO0lBRHpCLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQztHQUNiLGFBQWEsQ0FNekI7QUFOWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxXHJcbi8vIEV4YW1wbGVcclxuLy8gICAgVXNhZ2U6IHt7IGRhdGVWYWx1ZSB8IHVuaWNvZGVUb0RhdGUgfCBkYXRlOidNTS9kZC95eXl5JyB9fVxyXG4vLyAgICBEYXRhOiAyMDE0LTAxLTA1VDE4OjE0OjE4LjMyXHJcbi8vICAgIFJlc3VsdDogMDEvMDUvMjAxNFxyXG5cclxuaW1wb3J0IHtQaXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtuYW1lOiAnaXNvdG9kYXRlJ30pXHJcbmV4cG9ydCBjbGFzcyBJc29Ub0RhdGVQaXBlIHtcclxuICB0cmFuc2Zvcm0odmFsdWU6c3RyaW5nLCBhcmdzOnN0cmluZ1tdKSA6IGFueSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGF0ZVwiLHZhbHVlKTtcclxuICAgICAgaWYoIXZhbHVlKSByZXR1cm4gbmV3IERhdGUoKTtcclxuICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==