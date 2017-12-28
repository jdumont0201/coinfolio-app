"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//suboptimal, to store
function modelTypeToName(modelType, MT) {
    // if(modelType===MODELTYPES.Me) return "User";
    //if(modelType===MODELTYPES.Me) return "User";
    for (var key in MT) {
        if (modelType == MT[key])
            return key;
    }
    console.log("modelTypeToName not found", modelType, MT);
}
exports.modelTypeToName = modelTypeToName;
//# sourceMappingURL=ModelKeys.js.map