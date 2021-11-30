'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

let mySubTask = build.subTask('mySubTask',function(gulp,buildOption, done){
    this.log('Executing my subtask!!');
    done();
})
let myTask = build.task('myTask', mySubTask);
build.rig.addPostBuildTask(myTask);

build.initialize(require('gulp'));
