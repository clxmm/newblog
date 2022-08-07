---
title: 07stydy
---

### 1.jdk ,jre jvm的区别

## 2. ==和equals

==对比的是栈中的值，基本类型数据是变脸值，引用数据类型是堆中内存对象的地址

equals：object中默认也是采用==比较，通常会重写

Object

```java
    public boolean equals(Object obj) {
        return (this == obj);
    }
```

String

```java
public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = value.length;
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                        return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }
```



## 3.final

### 1.fianl的作用

最终的

- 修饰类，表示类不可以被继承

- 修饰方法：表示方法不可被子类覆盖，但是可以重载

- 修饰变量：一旦赋值就不可以更改

- 修饰成员变量：

  - 如果final修饰的是类变量(静态变量)，只能在声明改类变量时指定初始值或者在静态台吗块中初始值
  - 如果修饰的是成员变量，可以在非静态初始化块、声明改变量或者构造器中执行初始值

  ```java
      final static int a = 0;
  
  /*    static {
          a = 0;
      }*/    
  
  final int b = 0 ;
  
  /*    {
          b = 0;
      }*/
  ```

  

- 修饰局部变量
  - 系统不会为局部变量初始化，必须由程序员显示初始化，因此，在使用final修饰局部变量时，既可以在定义时指定默认值（后面的代码不能再对变量赋值）也可以不指定默认值，而是在后面的代码对final变量初始化，（仅一次）

```java
   final int loclA ;
        loclA = 0;
```

- 修饰基本类型和引用类型数据

  - 如果是基本类型，数据一旦初始化就不能改

  - 如果是引用类型变量，则对其在初始化之后便不能在让其指向另一个对象，**但是，引用的值可以变**

    ```java
        public static void main(String[] args) {
    
         
            final int[] arr = {1, 2, 3};
            arr[2] = 3;  // 合法
            arr = null; // 不合法
    
    
        }
    ```

    

### 2.为什么局部内部类和匿名内部类，只能访问局部final变量

```java
    // 局部final变量, 不加final，会默认自动加上
    public void test1(final int b) {
         final  int a = 10;
         // 匿名内部类
        new Thread() {
            @Override
            public void run() {
                System.out.println(a);
                System.out.println(b);
            }
        }.start();
        
    }
```

## 4.String、StringBuffer、StringBuilder的区别及使用场景

String是final修饰的，不可变，每次操作都会产生新的String

```java
private final char value[];
```

StringBuffer和StringBuilder都是在原对象上操作

StringBuffer是线程安全的，StringBuilder是线程不安全的

StringBuffer是synchronized修饰的，

性能：StringBuilder>StringBuffer>String

场景：如果改变字符串内容比较频繁，优先使用后两个

优先使用StringBuilder，多线程使用共享变量时，使用的是StringBuffer

## 5重载和重写的区别

- 重载，发生在同一个类中，方法名必须相同，参数类型不同，个数不同，顺序不同，方法返回值和访问修饰符可以不同，
- 重写：发生在父子类中，方法名，参数列表必须相同，返回值范围小于父类，抛出异常范围小于等于父类，访问修饰符范围大于等于父类，如果父类的方位修饰符为private，则子类不能重写改方法

```java
public int add(int a,String b);
public String add(int a,String b)；
编译报错
```



## 6.接口和抽象类的区别

- 抽象类中可以存在普通函数，接口中只能存在public abstract 接口
- 抽象类中的成员变量可以是各种类型的，接口中的成员变量只能是publci static final类型的
- 抽象类只能继承一个，接口可以实现多个

接口的设计目的，是对类的行为进行約束 （更准确的说是一种“有”约束，因为接口不能规定类不可以有什么行为），也就是提供一种机制，可以强制要求不同的类具有相同的行为。已只约束了行为的有无，但不对如何实现行为进行限制。

而抽象类的设计目的，是代码复用。当不同的类具有某些相同的行为(记为行为集合A)，日其中一部分行为的实现方式一致时 （A的非真子集，记为B）．可以让文出类都派生于个抽象类。在这个抽象类中买现了B，避免让所有的子类来买现B，这就达到了代码复用的日的。而A减B的部分，留给各个子类白己实现。正是因为A-B在这里没有实现，所以抽象类不允许实例化出来 （否则当调用到A-B时，无法执行)。

抽象类是对类本质的抽象表达的是 is a 的关系，比如：EMw is a car 。抽象类包含并实现子类的通用特性，将
子类存在差异化的特性进行抽象，交由子类去买现。

而接口是对行为的抽象，表达的是 like a 的关系。比如：Bira like a Aircraft（像飞行器一样可以飞)
但其本质上is a bird。接口的核心是定义行为，即实现类可以做什么，至于实现类主体是谁，是如何实现的，接口并
不关心

使用场景：当你关汪一个事物的本质的时候，用抽象类：当你关注一个操作的时候，用接口。

抽象类的功能要远超过接口
但是，定义抽象类的代价高。因为高级语言来说 （从实际设计上来说也是）每个类只
能继承一个类。在这个类中你必须继承或编写出其所有子类的所有共性。虽然接口在功能上会弱化许多，但是它
罘是针对一个动作的描述。而且你可以在一个类中同时实现多个接口。在设计阶段会降低难度

## 7.List和Set的却别

- List：有序，可重复的，允许多个null元素对象，按对象进入的顺序保存对象，可以使用Iterator取出所有元素，在逐一遍历，还可以get（int index）获取指定下标的元素
- set：无序，不可重复，最多允许一个Null对象元素，取元素是只能用Iterator获取所有元素，逐一遍历。

## 8.arrayList和LinkeList

- ArrayList : 基于动态数组，连续内存存储，适合下标访问（随机访问），扩容机制，超出长度存储数据时，需要新建数组，然后将老数组拷贝到新数组，如果不是尾部数据还会涉及到元素的移动（往后复制一份，插入元素），使用微插法并指定初始容量可以极大提升性能，甚至超过LinkeList（需要创建大量的node对象）
- LinkedList：基于链表，可以存储在分散的内存中，适合做数据插入及删除操作，不适合查询需要逐一遍历， 需要遍历，遍历LinkedList必须使用iterator不能使用for循环,get（i）获取元素时需要对list重写遍历，性能消耗大；另外indexOf返回元素时也会对list遍历

## 9.HashMap和HashTable的区别

- HashMap: 允许key和value为null，
- HashTable ： 是线程安全的，不允许key和value为null

底层实现：

jdk8开始，链表高度超过8，数组长度超过64，链表会变为红黑树，元素以内部类Node节点存在

- 计算key的hash值，二次hash然后对数组长度取模，对应到数组下标
- 如果没有产生hash冲突（下标位置没有元素），则直接创建Node存入数组
- 如果产生hash冲突，先进行equals比较，相同则取代改元素，不同，则判断链表高度，高度达到8，并且数组长度到64转为红黑树，长度低于6则将红黑树转会链表
- key为null，则在下标0的位置

**数组扩容**

## 10并发的三大特性

- 原子性：synchronized 
- 可见性：多个线程 synchronized volatile final
- 有序性: synchronized volatile

​     



## 11线程安全的理解

不是线程安全，应该是内存安全，堆事共享内存，可以被所有线程访问

`当乡个线程访问一个对象时，如果不用进行额外的同步控制或者其它的协调控制，调用这个对象的行为，都可以获得正确的结果，我们就说这个对象事线程安全的`

**堆**是进程和线程共有的空间，

**栈**是每个线程独有的，

## 12为什么用线程次？解释下线程池参数

- 降低资源消耗；降低线程的创建和销毁，提高利用率
- 提高响应速度
- 提高线程的可管理性，

线程池的核心参数

- corePoolSize:核心线程数，是一种常驻线程
- maximumPoolSize：最大线程数
- keepAliveTime、unit表示超过核心线程数之外的线程的空闲存活时间，
- workQueue：待执行的线程任务
- threadFactory：线程工厂
- handler：任务拒绝策略

## 13线程次处理流程

线程次执行任务

->判断核心线程数是否已满->未满，创建核心线程执行

​											-> 已满

-> 任务队列是否已满 ---> 未满，将任务放到队列中

​		-> 已满，最大线程是否达到---》未达到，创建临时线程执行

--〉以达到，执行拒绝策略

## 14线程池的底层原理

线程池内部是通过队列+线程实现的，当我们利用线程池执行任务时：

1.如果此时线程池中的线程数量**小于corePoolSize**即使线程处于空闲状态，也要创建新的线程来处理添加的任务。

2.如果此时线程池中的线程数量**等于corePoolSize**，但是缓冲队列workQueue未满，那么任务会被放到缓冲队列。

3.如果此时线程池中的线程数量**大于等于corePoolSize**，缓冲队列workQueue满了，线程池的数量小于maximumPoolSize，新建线程来处理任务，

4.如果此时线程池中的线程数量**大于corePoolSize**，缓冲队列workQueue满了，线程池的数量等于maximumPoolSize，那么通过handler所指定的策略来执行任务，

5.如果此时线程池中的线程数量**大于corePoolSize**，如果某些线程空闲时间超过keepAliveTime，线程将被终止，线程池可以动态调整线程池中的线程数。

## 15.线程中线程复用的原理

线程池将线程和任务进行解耦，线程时线程，任务时任务，摆脱了之前通过Thread创建线程时一个线程必须对应一个任务的限制。

在线程池中，同一个线程可以从阻塞队列中不断获取新任务来执行，其核心原理是对Thread进行了封装，并不是每次执行任务都会调用Thread.start来创建新新线程，而是让每一个线程去执行一个循环任务，在这个循环任务中不停检查是否有任务需要被执行，如果有则直接执行，也就是调用任务中的run方法，将run方法当成一个普通的任务来执行，通过这种方式使固定线程就将所有任务的run方法串联起来。

## 16线程的生命周期，线程有哪些状态

1.线程通常有五种状态，创建、就绪、运行、阻塞和死亡状态

2.阻塞通常有五种状态

	- 1.等待阻塞：运行的线程执行wait方法，该线程会释放占用的所有资源，jvm会把该线程放“等待池”中，进入这个状态后，是不能自动唤醒的，必须依靠其它线程调用notufy或者notifyAll方法，才能被唤醒，wait是object类的方法。
	- 2.同步阻塞：运行的线程在获取对象的同步锁时，若该同步锁被别的线程占用，则jvm会把该线程放入“锁池”中，
	- 3.其它阻塞：运行的线程执行sleep或join方法，或者发出了I/O请求时，jvm会把该线程置为阻塞状态。当sleep状态超时，join等待线程终止或者超时、或者I/O处理完毕时，线程重新转入就绪状态，sleep时Thread类的方法

五种状态的详细说明：

- 1。新建状态（New）：新创建一个线程对象。
- 2.就绪状态（Runnable）：线程对象创建后，调用该对象的start方法，该状态的线程位于可运行线程池中，变得可运行，等待获取cpu的使用权。
- 3.运行状态：（Running）：就绪状态的线程获取cpu，执行程序代码。
- 阻塞状态：（Blocked）：阻塞状态是线程因为某种原因放弃cpu使用权，暂时停止运行，直到线程进去就绪状态，才有机会转到运行状态。



