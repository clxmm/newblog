---
title: 06study03
--- 

## 1.Mysql的count(*)和count(1)谁更快？

统计mysql的行数的三种写法

```
select count(1)  from table ;
select count(*)  from table ;
select count(name)  from table ;
```

- count(*):计算所有数据中包含nul值的列数
- count(1)：计算所有数据中包含nul值的列数
- count（列名）：计算指定列中不包含null值的行数

innodb下 count(*)和count（1）一样快，快于count（列名）

innodb通过遍历最小的二级索引来处理语句，如果二级索引不存在，则会扫描聚集索引，



myisam下count（*）快于或等于cout（1），快于count（列名）

myisam的存储了表的总行数，使用count（*）不做统计，直接读取，所以最快。

那么，当使用count（1）时，假如第一列为not null ，myisam也会直接读取总行数进行优化。



count（列名）因为只统计不为null的，所以会便利整个表，性能下降。

## 2.Redis的大key如何处理

如何找到大key

- string 类型通过命令查找：

  `redis-cli -h 127.0.0.1 -p6379 -a 'password' --bigkeys`

- RdbTools工具

### 1.如何删除大key

- 直接删除大key会造成阻塞，因为redis是单线程拉行，阻塞期
  问，其他所有请求可能都会超时。超时越来越多，会造成redis
  连接会耗尽，产生各种异常
- 低峰期删除：凌晨，观察qps，选择低的时候，无法彻底解决
  阻塞
- 分批次删除：对子hash，使用hscan扫描法，对于集台采用
  srandmember每次随机取数据进行删除。对于有序集合可以使
  用zremrangebyrank直接删除，
  对于列表直接pop即可
- 异步删除法：用unlink代替del来删除，这样redis 会将这个key
  放入到一个异步线程中，进行删除，这样不会阻塞主线程。



