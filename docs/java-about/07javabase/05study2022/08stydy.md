---
title: 08stydy
--- 

## 1. CountDownLatch和Semaphore的区别和底层原理

CountDownLatch表示计数器，可以给CountDownLatch设置一个数字，一个线程调用CountDownLatch的await（）将会阻塞，其它线程可以调用CountDownLatch的countDown（）方法来对CountDownLatch中的数字减一，当数字被减为0后，所有await的线程都将被唤醒，

对应的底层原理就是，调用await（）方法的线程会利用AQS排队，一旦数字减为0，则会将Aqs中排序的线程一次唤醒。

Semaphore表示信号量，可以设置许可的个数，表示同时允许最多多少个线程使用该信号量，通过acquire（）来获取许可，如果没有许可可用则线程阻塞，并通过AQS来排队，可以通过release（）方法来释放许可，当某个线程释放了某个许可后，会从AQS中正在排队的第一个线程开始依次唤醒，直到没有空闲许可。

## 2.ReentrantLock中tryLock()和lock()方法的区别

- lock（） 阻塞加锁
- tryLock（） 非阻塞，尝试加锁，

## 3.ReentrantLock中的公平锁和非公平锁的底层实现

首先，不管是公平锁和非公平锁，他们的底层都会使用AQS来进行排队，他们的区别在于：线程在使用lock（）方法加锁时，如果是公平锁，会先检查AQS队列中是否存在线程在排队，如果有线程在排队，则当前线程也进行排队，如果是非公平锁，则不会去检查是否有线程在排队，而是直接竞争锁。

不管时公平锁还是非公平锁，一旦没有竞争到锁，都会进行排队，当释放锁时，都是唤醒排在最前面的线程，所以非公平锁只是体现了加锁阶段，而没有体现线程被唤醒阶段。

另外，ReentrantLock是可重入锁。

## 4.sleep、wait、join、yield的区别

1.锁池

所有需要竞争同步锁的线程都会放在锁池中，比如，当前对象的锁已经被其中一个线程得到，则其它线程需要在这个锁池进行等待，当前面的释放同步锁后，锁池中的线程会竞争同步锁，当某个线程得到后就会进入就绪队列等待cpu资源分配

2.等待池

当我们调用wait（）方法后，线程会放到等待池当中，等待池的线程是不会去竞争同步锁，只有调用了notify（）或者notifAll（）后等待池的线程才会去竞争锁，notify（）是随机从等待池选一个线程放到锁池，而notifyAll（）是将所有的线程放到锁池中

- 1、sleep是Thread类的静态本地方法，wait（）则是Object类的本地方法
- 2、sleeo方法不会释放lock，但wait会释放，而且会加入到等待队列中。

`sleep就是把cpu的执行资格和执行权释放出去，不再运行此线程，当定时结束后再取回cpu资源，参与cpu的调度，获取到cpu资源后就可以继续运行了，而如果sleep时刻该线程有锁，那么sleep不会释放这个锁，而是把锁带着进入了冻结状态，也就是说其它线程根本不可能获取到这个锁。也就是说无法执行程序。如果在睡眠期间其它线程调用了这个线程的interrupt方法，那么这个线程会抛出interruptexception异常返回，这点和wait是一样的。`

- 3、sleep方法不依赖synchronized,但是wait需要依赖synchronized关键字。
- 4、sleep不需要被唤醒（休眠后退出阻塞），wait需要（不指定时间需要被别人中断）
- 5、sleep一般用于当前线程休眠，或者暂停轮询操作，wait则多用于多线程之间的通信
- 6、sleep会让出cpu执行时间且强制切换上下文，而wait则不一定，wait后可能还是有机会重新竞争到锁继续执行

yield（）执行后线程直接进入就绪状态，马上释放了cpu的执行权，但是依然保留了cpu的执行资格，所以有可能cpu下次进行线程调度还会让这个线程获取到执行权继续执行

join（）执行后，新车进入阻塞状态，例如在线程B中调用线程A的join（），那线程B会进入到阻塞队列，直到线程A结束或中断线程

```java
    public static void main(String[] args) throws InterruptedException {

        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3_000L);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("222222");
            }
        });


        t1.start();
        t1.join();
        //  必须等t1执行完毕后，才会执行
        System.out.println("11111");


    }

222222
11111
```

## 5.Sychronized的偏向锁，轻量级锁，重量级锁，

1.偏向锁：在锁对象的对象头中，记录一下当前获取到该锁的线程id，该线程如果献词又来获取锁就可以直接获取到了，

2.轻量级锁：由偏向锁升级而来，当一个线程获取到锁后，此时这把锁是偏向锁，此时如果有第二个线程来竞争锁，偏向锁就会升级为轻量级锁，之所以叫轻量级锁，是为了和重量级锁区分开来，轻量级锁底层通过自旋来实现，并不会阻塞线程

3.如果自旋多次仍没有获取到锁，则会升级为重量级锁，重量级锁会导致线程阻塞。

4.自选锁，自选锁就是线程在获取锁的过程中，不会去阻塞线程，也就无所谓唤醒线程，阻塞和唤醒这两个步骤都是需要操作系统去进行的，比较消耗时间，自选锁是线程通过cas获取预期的一个标记，如果没有获取到，则继续循环获取，如果获取到了则表示获取到了锁，这个线程一直在运行中，相对而言没有使用太多的操作系统资源，比较轻量。

## 6.Sychronized和ReentrantLock的区别

- Sychronized是一个关键字，ReentrantLock是一个类
- Sychronized会自动的加锁于释放锁，ReentrantLock需要手动加锁与释放锁
- Sychronized底层是jvm层面的锁，ReentrantLock是api层面的锁，
- Sychronized是非公平锁，ReentrantLock可以选择公平锁或者非公平锁
- Sychronized锁的是对象，锁信息保存在对象头里面，ReentrantLock通过代码中int类型的state标识来标识锁的状态
- Sychronized的底层有一个锁升级的过程

## 7.ThreadLocal的底层原理

- 1.ThreadLocal是java中提供的线程本地存储机制，可以利用该机制将数据缓存在某个线程内部。该线程可以在任意时刻、任意方法获取缓存的数据
- 2.ThreadLocal底层是通过ThreadLocalMap来实现的，每个Thread对象（不是ThreadLocal对象）中都有一个ThreadLocalMap，Map的Key为ThreadLocal对象，Map的value为需要缓存的值
- 如果在线程池中使用ThreadLocal会造成内存泄漏，因为当ThreadLocal对象使用完之后，应该把设置的Key、value，也就是Entry对象进行回收，但是线程池中的线程不会回收，二线程对象通过是通过强引用执行ThreadLocalMap，ThreadLocalMap也是通过强引用指向Entry对象，线程不会被回收，Entry对象也不会回收，从而出现内存泄漏，解决办法是，在使用ThreadLocal对象之后，手动调用ThreadLocal的remove方法，手动清除entry对象
- ThreadLocal经典应用场景就是连接管理

## 8.GC如何判断对象可以被回收

- 引用计数法：每个对象有一个引用计数属性，新增一个引用时计数加1，引用释放时计数减一，计数为0时可以回收，
- 可达性分析法：从Gc Roots开始向下搜索，搜索走过的路径称为引用链，当一个对象到Gc Roots没有任何引用链相连时，则证明对象是不可用的，那么虚拟机判断是可以回收的对象

> 引用计数法，可能会出现A引用B，B又引用A，这个时候就算他们都不再使用了，但是应为引用计数器=1，永远无法回收

GC Roots的对象有：

- 虚拟机栈（栈帧中的本地变量表）中引用对象
- 方法区中类静态属性引用的对象
- 方法区中常量引用对象
- 本地方法栈中JNI（即一般说的Native方法）引用的对象

## 9.java类加载器

jdk自带的有三个类加载器，bootstrap ClassLoader 、extclassLoader、AppClassloader

BoottStrapClassloader是extclassLoader的父类加载器，默认负责加载%JAVA_HOME%/lib下的jar包和class文件

extclassLoader是AppClassloader的父类，默认加载%JAVA_HOME%/lib/ext文件夹下的jar包和class文件。

AppClassloader是自定义类加载器。负责加载classpath下的类文件

继承ClassLoader实现自定义类加载器

## 10jvm 哪些是线程共享区

堆区和方法区是线程共享的，栈、本地方法栈、程序计计数器是每个线程独有的

## 11.什么字节码，好处是什么

java的编译器和解释器：



采用字节码的好处：

面向虚拟机，

程序可移植，

## 12双亲委派模型

向上委派：实际上就是查询缓存，是否加载了该类，有则继续返回，没有继续向上，委派到顶层bootStrap，缓存中还没有，则到加载路径下查找，如果有则加载返回，没有则向下查找

向下查找：查找加载路径，有则加载返回，没有则继续向下查找



好处：

- 主要是为了安全性，避免用户自己编写的类替换java的一些核心类，String
- 避免类的重复加载，因为jvm中区分不同类，不仅仅是根据类名，相同的class被不同的Classloader加载就是不同的两个类。

## 13Java的内存结构,堆分为哪几部分,默认年龄多大进入老年代

1.年轻代

2.老年代

默认对象年龄达到15后，就会进入老年代

## 14 jvm 哪些可以作为gc root

## 15如何jvm的问题









