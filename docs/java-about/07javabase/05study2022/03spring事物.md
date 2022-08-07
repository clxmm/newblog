---
title: 03spring事物
---

事务的重要性不言而喻，Spring 对事务也提供了非常丰富的支持，各种支持的属性应有尽有。

然而很多小伙伴知道，这里有两个属性特别绕：

- 隔离性
- 传播性

## 1. 什么是事务

数据库事务是指作为单个逻辑工作单元执行的一系列操作，这些操作要么一起成功，要么一起失败，是一个不可分割的工作单元。

在我们日常工作中，涉及到事务的场景非常多，一个 service 中往往需要调用不同的 dao 层方法，这些方法要么同时成功要么同时失败，我们需要在 service 层确保这一点。

说到事务最典型的案例就是转账了：

> 张三要给李四转账 500 块钱，这里涉及到两个操作，从张三的账户上减去 500 块钱，给李四的账户添加 500 块钱，这两个操作要么同时成功要么同时失败，如何确保他们同时成功或者同时失败呢？答案就是事务。

事务有四大特性（ACID）：

![image-20220522174119231](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/04/20220522174119.png)

- **原子性（Atomicity）：** 一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。即，事务不可分割、不可约简。
- **一致性（Consistency）：** 在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设约束、触发器、级联回滚等。
- **隔离性（Isolation）：** 数据库允许多个并发事务同时对其数据进行读写和修改，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括未提交读（Read Uncommitted）、提交读（Read Committed）、可重复读（Repeatable Read）和串行化（Serializable）。
- **持久性（Durability）:** 事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。

## 2. Spring 中的事务

### 2.1 两种用法

Spring 作为 Java 开发中的基础设施，对于事务也提供了很好的支持，总体上来说，Spring 支持两种类型的事务，声明式事务和编程式事务。

编程式事务类似于 Jdbc 事务的写法，需要将事务的代码嵌入到业务逻辑中，这样代码的耦合度较高，而声明式事务通过 AOP 的思想能够有效的将事务和业务逻辑代码解耦，因此在实际开发中，声明式事务得到了广泛的应用，而编程式事务则较少使用，考虑到文章内容的完整，本文对两种事务方式都会介绍。

### 2.2 三大基础设施

Spring 中对事务的支持提供了三大基础设施，我们先来了解下。

- PlatformTransactionManager
- TransactionDefinition
- TransactionStatus

这三个核心类是 Spring 处理事务的核心类。

#### 2.2.1 PlatformTransactionManager

PlatformTransactionManager 是事务处理的核心，它有诸多的实现类，如下：

![image-20220522174447774](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/04/20220522174447.png)

PlatformTransactionManager 的定义如下：

```java
public interface PlatformTransactionManager {
    TransactionStatus getTransaction(@Nullable TransactionDefinition definition);
    void commit(TransactionStatus status) throws TransactionException;
    void rollback(TransactionStatus status) throws TransactionException;
}

```

可以看到 `PlatformTransactionManager` 中定义了基本的事务操作方法，这些事务操作方法都是平台无关的，具体的实现都是由不同的子类来实现的。

这就像 JDBC 一样，SUN 公司制定标准，其他数据库厂商提供具体的实现。这么做的好处就是我们 Java 程序员只需要掌握好这套标准即可，不用去管接口的具体实现。以 `PlatformTransactionManager` 为例，它有众多实现，如果你使用的是 JDBC 那么可以将 `DataSourceTransactionManager` 作为事务管理器；如果你使用的是 Hibernate，那么可以将 `HibernateTransactionManager` 作为事务管理器；如果你使用的是 JPA，那么可以将 `JpaTransactionManager` 作为事务管理器。`DataSourceTransactionManager`、`HibernateTransactionManager` 以及 `JpaTransactionManager` 都是 `PlatformTransactionManager` 的具体实现，但是我们并不需要掌握这些具体实现类的用法，我们只需要掌握好 `PlatformTransactionManager` 的用法即可。

`PlatformTransactionManager` 中主要有如下三个方法：

**1.getTransaction()**

getTransaction() 是根据传入的 TransactionDefinition 获取一个事务对象，TransactionDefinition 中定义了一些事务的基本规则，例如传播性、隔离级别等。

**2.commit()**

commit() 方法用来提交事务。

**3.rollback()**

rollback() 方法用来回滚事务。

#### 2.2.2 TransactionDefinition

`TransactionDefinition` 用来描述事务的具体规则，也称作事务的属性。事务有哪些属性呢？看下图：

主要是五种属性：

1. 隔离性
2. 传播性
3. 回滚规则
4. 超时时间
5. 是否只读

`TransactionDefinition` 类中的方法如下：

![image-20220522174935538](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/04/20220522174935.png)

可以看到一共有五个方法：

- getIsolationLevel()，获取事务的隔离级别
- getName()，获取事务的名称
- getPropagationBehavior()，获取事务的传播性
- getTimeout()，获取事务的超时时间
- isReadOnly()，获取事务是否是只读事务

TransactionDefinition 也有诸多的实现类，如下：

![image-20220522175008512](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/04/20220522175008.png)

如果开发者使用了编程式事务的话，直接使用 `DefaultTransactionDefinition` 即可。

#### 2.2.3 TransactionStatus

TransactionStatus 可以直接理解为事务本身，该接口源码如下：

```java
public interface TransactionStatus extends SavepointManager, Flushable {
    boolean isNewTransaction();
    boolean hasSavepoint();
    void setRollbackOnly();
    boolean isRollbackOnly();
    void flush();
    boolean isCompleted();
}

```

1. isNewTransaction() 方法获取当前事务是否是一个新事务。
2. hasSavepoint() 方法判断是否存在 savePoint()。
3. setRollbackOnly() 方法设置事务必须回滚。
4. isRollbackOnly() 方法获取事务只能回滚。
5. flush() 方法将底层会话中的修改刷新到数据库，一般用于 Hibernate/JPA 的会话，对如 JDBC 类型的事务无任何影响。
6. isCompleted() 方法用来获取是一个事务是否结束。

## 3. 编程式事务

通过 PlatformTransactionManager 或者 TransactionTemplate 可以实现编程式事务。如果是在 Spring Boot 项目中，这两个对象 Spring Boot 会自动提供，我们直接使用即可。但是如果是在传统的 SSM 项目中，则需要我们通过配置来提供这两个对象，松哥给一个简单的配置参考，如下（简单起见，数据库操作我们使用 JdbcTemplate）：

## 4. 声明式事务

### 4.1 XML 配置

### 4.2 Java 配置

### 4.3 混合配置

## 5. 事务属性

在前面的配置中，我们只是简单说了事务的用法，并没有和大家详细聊一聊事务的一些属性细节，那么接下来我们就来仔细捋一捋事务中的五大属性。

### 5.1 隔离性

首先就是事务的隔离性，也就是事务的隔离级别。

MySQL 中有四种不同的隔离级别，这四种不同的隔离级别在 Spring 中都得到了很好的支持。Spring 中默认的事务隔离级别是 default，即数据库本身的隔离级别是啥就是啥，default 就能满足我们日常开发中的大部分场景。

不过如果项目有需要，我们也可以调整事务的隔离级别。

调整方式如下：

#### 5.1.1 编程式事务隔离级别

#### 5.1.2 声明式事务隔离级别

### 5.2 传播性

先来说说何谓事务的传播性：

> 事务传播行为是为了解决业务层方法之间互相调用的事务问题，当一个事务方法被另一个事务方法调用时，事务该以何种状态存在？例如新方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行，等等，这些规则就涉及到事务的传播性。

关于事务的传播性，Spring 主要定义了如下几种：

```java
public enum Propagation {
    REQUIRED(TransactionDefinition.PROPAGATION_REQUIRED),
    SUPPORTS(TransactionDefinition.PROPAGATION_SUPPORTS),
    MANDATORY(TransactionDefinition.PROPAGATION_MANDATORY),
    REQUIRES_NEW(TransactionDefinition.PROPAGATION_REQUIRES_NEW),
    NOT_SUPPORTED(TransactionDefinition.PROPAGATION_NOT_SUPPORTED),
    NEVER(TransactionDefinition.PROPAGATION_NEVER),
    NESTED(TransactionDefinition.PROPAGATION_NESTED);
    private final int value;
    Propagation(int value) { this.value = value; }
    public int value() { return this.value; }
}

```

具体含义如下：

| 传播性        |                                                              |
| ------------- | ------------------------------------------------------------ |
| REQUIRED      | 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务 |
| SUPPORTS      | 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行 |
| MANDATORY     | 如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常 |
| REQUIRES_NEW  | 创建一个新的事务，如果当前存在事务，则把当前事务挂起         |
| NOT_SUPPORTED | 以非事务方式运行，如果当前存在事务，则把当前事务挂起         |
| NEVER         | 以非事务方式运行，如果当前存在事务，则抛出异常               |
| NESTED        | 如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于 TransactionDefinition.PROPAGATION_REQUIRED |





## 6. 注意事项

- 事务只能应用到 public 方法上才会有效。
- 事务需要从外部调用，Spring 自调事务用会失效。即相同类里边，A 方法没有事务，B 方法有事务，A 方法调用 B 方法，则 B 方法的事务会失效，这点尤其要注意，因为代理模式只拦截通过代理传入的外部方法调用，所以自调用事务是不生效的。
- 建议事务注解 @Transactional 一般添加在实现类上，而不要定义在接口上，如果加在接口类或接口方法上时，只有配置基于接口的代理这个注解才会生效。