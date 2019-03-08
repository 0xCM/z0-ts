import chalk from "chalk"
import {AppMessage} from "."

const format = <M>(msg : AppMessage<M>) =>
    `${msg.id}: ${msg.content}`

export const notify = <M>(msg : AppMessage<M>) =>
    msg.severity == "error" ? console.log(chalk.red(format(msg)))
    : msg.severity == "warning" ? console.log(chalk.yellow(format(msg)))
    : msg.severity == "info" ? console.log(chalk.green(format(msg)))
    : console.log(chalk.gray(format(msg)))
