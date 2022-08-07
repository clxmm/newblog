---
title: 62入门-Spring整合web与三层架构回顾
---

## 1. MVC三层架构【回顾】

关于三层架构的演进过程，小册就不展开讲解了，咱直接来回顾 MVC 三层架构的最终形态就 OK ，毕竟前面的过程都是不完全形态，也没必要再调动起回忆了。

### 1.1 MVC

MVC 想必各位都很熟悉了，MVC 的三个字母分别代表 **Model View Controller** ，它们在一个应用中的地位和职责应该是下面图的样子：

![](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/07/20220710211804.png)

如果回忆不起来的小伙伴一定要加深印象，后面咱学习 SpringWebMvc 的时候还会用它的。

### 1.2 三层架构

JavaEE 中的三层架构，是为了实现代码逻辑解耦的经典设计模式，这个想必咱也都很熟悉了。三层架构分别为 **web 层、service 层、dao 层**，它们的职责及调用逻辑可以用下图表示：

![image-20220710212000018](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/07/20220710212000.png)

这个虽说是老生常谈了，接下来的学习和实际的项目开发中也都会用到，所以小伙伴们还是加深一下印象哈。

## 2. Spring整合web开发【掌握】

接下来的内容就是 SpringFramework 如何整合 web 工程进行实际的开发了。注意现在还没有涉及到 mvc 的东西，所以小伙伴们先不要着急，先回顾一下 Servlet 的东西也未尝不可。

接下来，咱分为基于 web.xml 和 Servlet 3.0 规范的方式，分别讲解 SpringFramework 如何整合 web 开发。

### 2.1 工程创建

先把项目工程创建出来吧。还是照常，使用 Maven 创建一个新的模块 `spring-04-web` 就好啦，本章的所有源码也都在这个工程下。

创建出来之后，不要忘了先把打包方式改为 **war** ：

```xml
    <groupId>com.linkedbear.spring</groupId>
    <artifactId>spring-04-web</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
```

之后是添加依赖的部分，既然是 SpringFramework 整合 web ，那必然要多导入一个依赖啦：

```xml
<properties>
    <spring.framework.version>5.2.8.RELEASE</spring.framework.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.framework.version}</version>
    </dependency>

    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>${spring.framework.version}</version>
    </dependency>

    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

当然，不要忘记导 Servlet API 的依赖哈。

导入完成后，照例将其先部署到 Tomcat 中：（下面是 IDEA 的配置方法）

![image-20220710214151468](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/07/20220710214151.png)

![](https://cdn.jsdelivr.net/gh/clxmm/image@main/img/2022/07/20220710214243.png)

配置完成后，启动 Tomcat ，无任何报错则说明一切配置正确，可以接着往下进行了。

### 2.2 基于web.xml的web整合

首先，咱来准备一点基础代码。

#### 2.2.1 基础代码准备



