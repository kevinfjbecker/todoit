/*
 * select
 */
// import { select, Separator } from '@inquirer/prompts';
// // Or
// // import select, { Separator } from '@inquirer/select';

// const answer = await select({
//   message: 'Select a package manager',
//   choices: [
//     {
//       name: 'npm',
//       value: 'npm',
//       description: 'npm is the most popular package manager',
//     },
//     {
//       name: 'yarn',
//       value: 'yarn',
//       description: 'yarn is an awesome package manager',
//     },
//     new Separator(),
//     {
//       name: 'jspm',
//       value: 'jspm',
//       disabled: true,
//     },
//     {
//       name: 'pnpm',
//       value: 'pnpm',
//       disabled: '(pnpm is not available)',
//     },
//   ],
// });

/*
 * input
 */
import { input } from '@inquirer/prompts';
// // Or
// // import input from '@inquirer/input';

// // const answer = await input({ message: 'Enter your name' });
const answer = await input({
    message: 'Enter a command or [return] for interactive mode',
    theme: {}
})