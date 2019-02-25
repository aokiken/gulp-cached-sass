'use strict';
const {parseDir} = require('sass-graph');
const gulpForEach = require('gulp-foreach');
const {src} = require('vinyl-fs');
const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-cached-sass';

const plugin = function (baseDir) {
    if (!baseDir) {
        throw new PluginError(PLUGIN_NAME, 'Missing baseDir!');
    }

    const graph = parseDir(baseDir);
    const getUpdateFile = (currentStream, file) => {
        let files = [file.path];
        const addParent = (childPath) =>
            graph.visitAncestors(childPath, (parent) => {
                if (!files.includes(parent)) {
                    files.push(parent);
                }
                return addParent(parent);
            });
        addParent(file.path);
        return src(files, {
            base: baseDir
        });
    };
    return gulpForEach(getUpdateFile);
};

module.exports = plugin;
