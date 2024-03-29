---
title: 61Dao编程总结
---

## 1. JdbcTemplate

对于 Dao 编程的部分，在基础的 API 使用中并不会涉及到面试的内容，所以这部分相对比较简单轻松。

### 1.1 JdbcTemplate的设计

`JdbcTemplate` 只是一个基于原生 jdbc 的简单封装，它提供了 CRUD 的方法，以及直接执行 SQL 的方法。注意它也仅仅是一个简单的封装，无法与那些 ORM 框架类比。

> 如果小伙伴有学过 DbUtils ，则理解起来会更容易，因为它跟 `QueryRunner` 基本上是一样的东西，如果说类比的话也是跟它类比。

### 1.2 JdbcTemplate的使用和扩展

JdbcTemplate 提供了几类方法供我们使用：

- execute ：用于直接执行 SQL ，通常用于执行 DDL 语句
- update ：用于对表数据执行增删改操作，通常用于 DML 语句
- query ：用于查询数据，用于 DQL 语句
- call ：一般用于执行存储过程、函数等（小册没有讲）

使用 `JdbcTemplate` 一般都是在三层架构下，在 Dao 层使用，该方法通常 Dao 实现类会继承 `JdbcDaoSupport` ，直接在其中注入 `DataSource` 即可获得 `JdbcTemplate` 。

除此之外，`JdbcTemplate` 还有一种基于 SQL 参数扩展的 `NamedParameterJdbcTemplate` ，使用它的时候 SQL 的参数将不再使用 ? 作为占位符，而是使用参数引用的方式。

## 2. 事务理论

### 2.1 事务的四大特性

- **原子性**：一个事务就是一个不可再分解的单位，事务中的操作要么全部做，要么全部不做。原子性强调的是事务的**整体**
- **一致性**：事务执行后，所有的数据都应该保持一致状态。一致性强调的是数据的**完整**
- **隔离性**：多个数据库操作并发执行时，一个请求的事务操作不能被其它操作干扰，多个并发事务执行之间要相互隔离。隔离性强调的是**并发**的隔离
- **持久性**：事务执行完成后，它对数据的影响是永久性的。持久性强调的是操作的**结果**

### 2.2 事务隔离级别

针对数据库的并发操作，可能会出现一些事务的并发问题。事务并发操作中会出现三种问题：

-  脏读：一个事务读到了另一个事务没有提交的数据
- 不可重复读：一个事务读到了另一个事务已提交修改的数据
  - 对同一行数据查询两次，结果不一致
- 幻读：一个事务读到了另一个事务已提交新增的数据
  - 对同一张表查询两次，出现新增的行，导致结果不一致

针对上述三个问题，由此引出了事务的隔离级别：

- **read uncommitted** 读未提交 —— 不解决任何问题
- **read committed** 读已提交 —— 解决脏读
- **repeatable read** 可重复读 —— 解决脏读、不可重复读
- **serializable** 可串行化 —— 解决脏读、不可重复读、幻读

四种隔离级别，自上而下级别逐级增高，但并发性能逐级降低。MySQL 中默认的事务隔离级别是 **repeatable read** ，Oracle 、PostgresSQL 的默认事务隔离级别是 **read committed** 。

## 3. Spring事务

SpringFramework 的事务，是自己定义设计的模型，所以咱要先从模型入手来复习咯。

### 3.1 事务控制模型和核心逻辑

SpringFramework 的事务控制模型，实际上是三个最顶层的接口：

- **`PlatformTransactionManager`** ：平台事务管理器（5.2 之后抽象为更高级别的 `TransactionManager` ，但该接口仅仅为标识性接口）
- **`TransactionDefinition`** ：事务定义信息
- **`TransactionStatus`** ：事务状态信息

SpringFramework 对于事务的控制，可以理解为**事务管理器，可以根据事务的定义，获取 / 控制事务的状态**。

流程控制来讲，当需要事务控制时，会先根据被执行的方法，解析（获取）到对应的事务定义信息，再以此从事务管理器中获取 / 创建处事务状态信息，并绑定到线程中。

> 学完整个进阶和原理部分之后，是不是对这三个接口的认识会更深刻呢？如果是，那说明小伙伴们已经基本上掌握了 SpringFramework 的事务控制模型了，非常好啊。

### 3.2 事务的使用方式

SpringFramework 的事务使用，可以分为编程式与声明式：

- 编程式事务：通过借助 `TransactionTemplate` ，将业务逻辑写在 `TransactionCallback` 的内部，以此来达到事务控制的效果

- 声明式事务：通过配置事务增强器 / 开启注解声明式事务，并配置通知方法 / 标注 `@Transactional` 注解，也可以实现事务控制【常用】

### 3.3 事务传播行为

事务传播行为，指的是外层的事务传播到内层的事务后，内层的事务作出的行为（持有的态度）。SpringFramework 中定义了 7 种传播行为：

| 传播行为                           |                                                              |
| ---------------------------------- | ------------------------------------------------------------ |
| PROPAGATION_REQUIRED：必需的       | 如果当前没有事务运行，则会开启一个新的事务；如果当前已经有事务运行，则方法会运行在当前事务中 |
| PROPAGATION_REQUIRES_NEW ：新事务  | 如果当前没有事务运行，则会开启一个新的事务；如果当前已经有事务运行，则会将原事务挂起（暂停），重新开启一个新的事务。当新的事务运行完毕后，再将原来的事务释放 |
| PROPAGATION_SUPPORTS ：支持        | 如果当前有事务运行，则方法会运行在当前事务中；如果当前没有事务运行，则不会创建新的事务（即不运行在事务中） |
| PROPAGATION_NOT_SUPPORTED ：不支持 | 如果当前有事务运行，则会将该事务挂起（暂停）；如果当前没有事务运行，则它也不会运行在事务中 |
| PROPAGATION_MANDATORY ：强制       | 当前方法必须运行在事务中，如果没有事务，则直接抛出异常       |
| PROPAGATION_NEVER ：不允许         | 当前方法不允许运行在事务中，如果当前已经有事务运行，则抛出异常 |
| PROPAGATION_NESTED ：嵌套          | 如果当前没有事务运行，则开启一个新的事务；如果当前已经有事务运行，则会记录一个保存点，并继续运行在当前事务中。如果子事务运行中出现异常，则不会全部回滚，而是回滚到上一个保存点 |

### 3.4 事务高级特性

#### 3.4.1 事务监听器

事务监听器是 SpringFramework 基于原有的事件监听机制扩展的，它的核心注解是 **`@TransactionalEventListener`** ，它可以在事务执行的特定阶段触发事件监听。事务监听支持以下 4 种监听时机：

- BEFORE_COMMIT ：事务提交之前触发监听
- AFTER_COMMIT ：事务提交之后触发监听
- AFTER_ROLLBACK ：事务回滚之后触发监听
- AFTER_COMPLETION ：事务完成之后触发监听（无论提交或回滚均触发）

#### 3.4.2 JTA分布式事务

SpringFramework 支持基于 JTA 的分布式事务，JTA 分布式事务是基于 XA 规范的抽象，而 XA 规范是两阶段提交协议的数据库层支持方案。JTA 分布式事务中具有以下几个重要的角色：

- 全局事务管理器：控制一整个分布式事务的事务管理器，它可以控制一个分布式事务中各个节点分支上的事务提交或回滚
- 资源管理器：可以简单的理解为关系型数据库
- 应用程序：我们自己编写的程序

SpringFramework 使用 JTA 事务时，需要有外部 JTA 事务资源管理器的支持，或者整合第三方 JTA 事务框架 （如 Atomikos），方可形成完整的 JTA 事务控制的模型。

### 3.5 事务失效的场景

这个问题咱在前面没有讲到，考虑到这个问题一般都是在项目实战，或者面试之前才会碰到，所以小册在前面并没有讲解，而是在最后再说。

一般情况下，事务失效会有如下场景：

- 原始的 SSM 开发中，父子容器一起包扫描，会导致子容器先扫描到 service 并注册到子容器中但不加载事务，之后虽然父容器也扫描到 service 但因为子容器中的 controller 已经注入了没有事务代理的 service ，会导致事务失效
  - 如果小伙伴已经接触了项目开发，或许会遇到这个问题。结合前面 IOC 进阶部分的知识，我们知道容器是有父子关系的，在整合 SpringWebMvc 之后，会形成父子容器，子容器中只有 controller ，对应的 `spring-mvc.xml` 配置文件或注解配置类中，是只应该扫描 `@Controller` 注解的，这样才可以保证子容器仍然能从父容器中获取到 service 、dao 等，而父容器会开启事务控制，所以 service 是被事务增强过的。
  - 如果不慎在 spring-mvc.xml 中，扫描 controller 时一并扫描了 service ，会导致父子容器中同时存在 service ，则此时 controller 不会去父容器找，而是直接拿子容器中没有被事务增强过的 service ，导致事务失效。

-  声明式事务的配置必须由父 IOC 容器加载，SpringWebMvc 的子 IOC 容器加载不生效
  - 与上面类似，声明式事务控制放在子容器，父容器不会感知到子容器的配置，所以相当于“啥也没干”

- 如果 `@Transactional` 注解标注在接口上，但实现类使用 Cglib 代理，则事务会失效
  - Cglib 直接拿类去增强，不管接口了，自然也就不好使了
- 事务默认捕捉 `RuntimeException` ，如果抛出 `Exception` ，默认不捕捉，事务失效
  - 所以咱在前面讲解的时候，说了一般情况下都是显式声明捕捉 Exception

- service 方法中自行 try-catch 了异常但没有再抛出 `RuntimeException` ，会导致事务拦截器无法感知到异常，从而失效
  - 事务的控制就是以方法运行时抛出的异常来决定控制逻辑，那我们自己把异常吞了，自然也就没事务回滚的事了

- 同一个类中，一个方法调用了自身另一个带有事务控制的方法，则直接调用时也会导致事务失效

   



