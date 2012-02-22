var config = module.exports;
config["VCard browser"] = {
    environment: "browser",
    sources: [
        "libs/jquery.js", // Paths are relative to config file
        "src/**/*.js"   // Glob patterns supported
    ],
    tests: [
        "tests/*-spec.js",
        "tests/*-dom.js"
    ]
};
config["VCard node"] = {
    environment: "node",
    sources: [
        "src/vCard.js", // Paths are relative to config file
        "src/**/*.js"   // Glob patterns supported
    ],
    tests: [
        "tests/*-spec.js"
    ]
};
