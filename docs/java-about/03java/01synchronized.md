---

title: 05 并发编程中的synchronized  (1)

---

### 并发编程中的三个问题

### 1.可见性

- 可见性概念

  ​	可见性(Visibility):是指一个线程对共享变量进行修改，另一个先立即得到修改后的最新值。	

- 可见性演示

  ​	案例演示:一个线程根据boolean类型的标记flag， while循环，另一个线程改变这个flag变量的值，另 一个线程并不会停止循环。

```java
/**
     * 可见性问题
     * 1。创建要一个共享变量
     * 2。创建一条不断读取共享变量
     * 3。创建一条线程修改共享变量
     * 
     * 并发编程时，会出现可见性问题，当一个线程对共享变量进行了修改，另外的线程并没有立即看到修改
     * 后的最新值。
     */
    private static boolean flag = true;
    public static void main(String[] args) throws InterruptedException {
        new  Thread(() -> {
            while (flag) {

            }
        }).start();

        Thread.sleep(2_000);
        new  Thread(() -> {
            flag = false;
            System.out.println("修改了flag " + flag);
        }).start();


    }
```

### 2.原子性

 - 原子性概念

   原子性(Atomicity):在一次或多次操作中，要么所有的操作都执行并且不会受其他因素干扰而中断，要么所有的操作都不执行。

 - 原子性演示

   案例演示:5个线程各执行1000次 i++;

```java
   /**
     * 5个线程各执行1000次 i++;
     * @param args
     */
    private static int number = 0;
    public static void main(String[] args) throws InterruptedException {
        Runnable inc = () -> {
            for (int i = 0; i < 1000; i++) {
                number ++;
            }
        };

        List<Thread> list = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Thread t = new Thread(inc);
            t.start();
            list.add(t);
        }

        for (Thread thread : list) {
            thread.join();
        }

        System.out.println(number);
    }

```

​		其中，对于 number++ 而言(number 为静态变量)，实际会产生如下的 JVM 字节码指令:

```
9: getstatic     #12                 // Field number:I
12: iconst_1
13: iadd
14: putstatic     #12                 // Field number:I
```

​		由此可见number++是由多条语句组成，以上多条指令在一个线程的情况下是不会出问题的，但是在多 线程情况下就可能会出现问题。比如一个线程在执行13: iadd时，另一个线程又执行9: getstatic。会导 致两次number++，实际上只加了1。

**并发编程时，会出现原子性问题，当一个线程对共享变量操作到一半时，另外的线程也有可能来操作共 享变量，干扰了前一个线程的操作。**

### 3.有序性

- 有序性概念

  ​		有序性(Ordering):是指程序中代码的执行顺序，Java在编译时和运行时会对代码进行优化，会导致 程序最终的执行顺序不一定就是我们编写代码时的顺序。

- 有序性演示

  jcstress是java并发压测工具。https://wiki.openjdk.java.net/display/CodeTools/jcstress

  修改pom文件，添加依赖:

  ```xml
  <dependency>
      <groupId>org.openjdk.jcstress</groupId>
      <artifactId>jcstress-core</artifactId>
      <version>0.5</version>
  </dependency>
  ```

```java
@JCStressTest
@Outcome(id = {"1","4"}, expect = Expect.ACCEPTABLE, desc = "ok")
@Outcome(id = "0", expect = Expect.ACCEPTABLE_INTERESTING,desc = "danger")
@State
class Test03Ordering {


    int num = 0;
    boolean ready = false;

    // 线程一执行的代码
    @Actor
    public void actor1(I_Result r) {
        if (ready) {
            r.r1 = num + num;
        } else {
            r.r1 = 1;
        }
    }

    // 线程2执行的代码
    @Actor
    public void actor2(I_Result r) {
        num = 2;
        ready = true;
    }

}
```



​		I_Result 是一个对象，有一个属性 r1 用来保存结果，在多线程情况下可能出现几种结果? 情况1:线 程1先执行actor1，这时ready = false，所以进入else分支结果为1。

​		情况2:线程2执行到actor2，执行了num = 2;和ready = true，线程1执行，这回进入 if 分支，结果为 4。

​		情况3:线程2先执行actor2，只执行num = 2;但没来得及执行 ready = true，线程1执行，还是进入 else分支，结果为1。

​		还有一种结果0。

程序代码在执行过程中的先后顺序，由于Java在编译期以及运行期的优化，导致了代码的执行顺序未必 就是开发者编写代码时的顺序。

## 第二章:Java内存模型( JMM)

### 1. 计算机结构

- 计算机结构简介

冯诺依曼，提出计算机由五大组成部分，输入设备，输出设备存储器，控制器，运算器。

- CPU
- 内存
- 缓存

### 2. Java内存模型

#### Java内存模型的概念

​	Java Memory Molde (Java内存模型/JMM)，千万不要和Java内存结构混淆

​	https://download.oracle.com/otn-pub/jcp/memory_model-1.0-pfd-spec-oth-JSpec/memory_model-1_0-pfd-spec.pdf

Java内存模型，是Java虚拟机规范中所定义的一种内存模型，Java内存模型是标准化的，屏蔽掉了底层不同计算机的区别。 

Java内存模型是一套规范，描述了Java程序中各种变量(线程共享变量)的访问规则，以及在JVM中将变量 存储到内存和从内存中读取变量这样的底层细节，具体如下。

- 主内存

  主内存是所有线程都共享的，都能访问的。所有的共享变量都存储于主内存。

- 工作内存

  每一个线程有自己的工作内存，工作内存只存储该线程对共享变量的副本。线程对变量的所有的操 作(读，取)都必须在工作内存中完成，而不能直接读写主内存中的变量，不同线程之间也不能直接 访问对方工作内存中的变量。

Java内存模型的作用

​	Java内存模型是一套在多线程读写共享数据时，对共享数据的可见性、有序性、和原子性的规则和保障。

synchronized,volatile 

#### CPU缓存，内存与Java内存模型的关系

​		通过对前面的CPU硬件内存架构、Java内存模型以及Java多线程的实现原理的了解，我们应该已经意识 到，多线程的执行最终都会映射到硬件处理器上进行执行。

​		但Java内存模型和硬件内存架构并不完全一致。对于硬件内存来说只有寄存器、缓存内存、主内存的概 念，并没有工作内存和主内存之分，也就是说Java内存模型对内存的划分对硬件内存并没有任何影响， 因为JMM只是一种抽象的概念，是一组规则，不管是工作内存的数据还是主内存的数据，对于计算机硬 件来说都会存储在计算机主内存中，当然也有可能存储到CPU缓存或者寄存器中，因此总体上来说， Java内存模型和计算机硬件内存架构是一个相互交叉的关系，是一种抽象概念划分与真实物理硬件的交叉。

​	Java内存模型是一套规范，描述了Java程序中各种变量(线程共享变量)的访问规则，以及在JVM中将变量 存储到内存和从内存中读取变量这样的底层细节，Java内存模型是对共享数据的可见性、有序性、和原 子性的规则和保障。

