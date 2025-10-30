const core = require('@actions/core');
// can be used to get context vairable data for example
// also provides a kit "octokit" to call github apis
const github = require('@actions/github'); // not used in this script files
const exec = require('@actions/exec');

function run() {
    // log message to github log
    core.notice('hello from my js actions')

    // get inputs
    // required => throws an error in case the input is not found
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('bucket-folder', { required: true });

    const s3Uri = `s3://${bucket}`
    // this allows us to execute commands
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const websiteUrl = `https://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput(websiteUrl);
}

run();