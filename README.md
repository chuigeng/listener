# lottery-listener

彩票监听

## 简介
对彩票开奖结果进行监听和提醒。  

基于 [Cron](https://www.npmjs.com/package/cron) 实现。Cron 可以创建定时任务并进行 start 和 stop 操作，但是如果定时任务启动后作为守护进程运行，stop 就不是很方便了，所以对 Cron 进行了包装，方便对任务进行启动和停止。  

其实可以把该项目抽象成 Cron 管理器。以后有用到其他场景再做抽象。记个仿佛不会做的 [TODO](https://github.com/chuigeng/lottery-listener/issues/1)。

## 使用
### 文件结构
* lib: 公共类库 
* listeners: 自定义的监听器/任务，继承自 `lib/Listener`
* logs: 日志
* listener.js: 入口文件

### 如何使用
1. 实现自己的 Listener
2. 命令行运行

#### 实现 Listener
在 `listeners` 目录下实现自己的 Listener，需要继承 `lib/Listener`。可参考代码中的 `listener/demo.js`，只需要实现任务的业务逻辑。

#### 命令行运行

> node listener -l \<listener\> -a \<start | stop\> -c \[cron\] &

* -l, --listener: 执行的 listener 的名称，与 `listeners` 目录中定义的文件名相同
* -a, --action: 执行的操作，可选值 start | stop
* -c, --cron: 执行周期，可参考 [Cron](https://www.npmjs.com/package/cron)


执行 `node listener -h` 获取使用帮助


#### 例子
一个简单的 Listener [demo](https://github.com/chuigeng/lottery-listener/blob/master/listeners/demo.js)  

每秒执行一次 demo  
> node listener -l demo -a start -c "* * * * * *" &

停止 demo
> node listener -l demo -a stop

执行时的日志（在 `logs` 目录中）。

```
[Tue Feb 20 2018 12:44:33 GMT+0800 (CST)] INFO Listener[demo] start
[Tue Feb 20 2018 12:44:34 GMT+0800 (CST)] INFO Listener[demo][1] start
[Tue Feb 20 2018 12:44:34 GMT+0800 (CST)] INFO Listener[demo][1] finish
[Tue Feb 20 2018 12:44:35 GMT+0800 (CST)] INFO Listener[demo][2] start
[Tue Feb 20 2018 12:44:35 GMT+0800 (CST)] INFO Listener[demo][2] finish
[Tue Feb 20 2018 12:44:36 GMT+0800 (CST)] INFO Listener[demo][3] start
[Tue Feb 20 2018 12:44:36 GMT+0800 (CST)] INFO Listener[demo][3] finish
[Tue Feb 20 2018 12:44:37 GMT+0800 (CST)] INFO Listener[demo][4] start
[Tue Feb 20 2018 12:44:37 GMT+0800 (CST)] INFO Listener[demo][4] finish
[Tue Feb 20 2018 12:44:38 GMT+0800 (CST)] INFO Listener[demo][5] start
[Tue Feb 20 2018 12:44:38 GMT+0800 (CST)] INFO Listener[demo][5] finish
[Tue Feb 20 2018 12:44:39 GMT+0800 (CST)] INFO Listener[demo] stop
```
方括号的数字代表第 n 次运行。如 `[Tue Feb 20 2018 12:44:38 GMT+0800 (CST)] INFO Listener[demo][5] start` 表示 demo 第五次运行。

你也可以在自己的 Listener 中使用 this.logger 记录日志。该日志将出现在 start 和 finish 日志中间。
