/*
 * My example
 */
console.clear()

const total = Math.floor(Math.random() * 50)

import ProgressBar from "progress"
const bar = new ProgressBar(
    '    [:bar] [:status] :current/:total :percent :etas',
    {
        complete: '=',
        incomplete: ' ',
        total,
        width: 30
    }
)

let step = 0
const timer = setInterval(() => 
{
    step++

    const response = Math.random() < 0.9 ? 'OK' : 'ERROR'

    if(response === 'ERROR')
    {
        bar.interrupt(`Error encounterd on step ${step}`)
    }

    bar.tick({status: response})

    if(step === total)
    {
        clearInterval(timer)
    }
}, 250)

/*
* Simplest
*/
// import ProgressBar from 'progress';
// var bar = new ProgressBar(':bar', { total: 10 });
// var timer = setInterval(function () {
//       bar.tick();
//       if (bar.complete) {
//             console.log('\ncomplete\n');
//             clearInterval(timer);
//           }
//         }, 100);
//         ds
/*
 * Custom tokens
 */
// import ProgressBar from 'progress';
// var bar = new ProgressBar(':current: :token1 :token2', { total: 3 })
// bar.tick({
//   'token1': "Hello",
//   'token2': "World!\n"
// })
// bar.tick(2, {
//   'token1': "Goodbye",
//   'token2': "World!"
// })

/*
 * download
 */
// import ProgressBar from 'progress';
// import { request } from 'https';

// var req = request({
//   host: 'download.github.com',
//   port: 443,
//   path: '/visionmedia-node-jscoverage-0d4608a.zip'
// });

// req.on('response', function(res){
//   var len = parseInt(res.headers['content-length'], 10);

//   console.log();
//   var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
//     complete: '=',
//     incomplete: ' ',
//     width: 20,
//     total: len
//   });

//   res.on('data', function (chunk) {
//     bar.tick(chunk.length);
//   });

//   res.on('end', function () {
//     console.log('\n');
//   });
// });

// req.end();

/*
 * Interupt messages
 */
// import ProgressBar from 'progress';
// var bar = new ProgressBar(':bar :current/:total', { total: 10 });
// var timer = setInterval(function () {
//   bar.tick();
//   if (bar.complete) {
//     clearInterval(timer);
//   } else if (bar.curr === 1) {
//       bar.interrupt('begin');
//   } else if (bar.curr === 5) {
//       bar.interrupt('this message appears above the progress bar\ncurrent progress is ' + bar.curr + '/' + bar.total);
//   }
// }, 1000);