---
title: 54dbcTemplate在Dao层的使用方式
---

## 1. JdbcTemplate移入Dao层【掌握】

对于 Dao 层而言，它负责的部分就是与数据库的交互，之前在学习 JavaWeb 基础时，咱都是使用 jdbc 的方式，那整合了 SpringFramework 的 jdbc 之后，就应该使用 `JdbcTemplate` 了。下面咱先来写一个比较简单的代码场景。

### 1.1 代码准备

咱先把大致的代码框架都准备好，这一章咱使用注解驱动的方式来演示，

咱还是以 `tbl_user` 表为例介绍，首先要有一个 `UserDao` 接口：

```java
public interface UserDao {
    void save(User user);
    User findById(Integer id);
    List<User> findAll();
}
```

然后，有对应的实现类 `UserDaoImpl` ：（记得标 `@Repository` 注解，过会包扫描）

```java
@Repository
public class UserDaoImpl implements UserDao {
    
    @Override
    public void save(User user) {
        
    }
    
    @Override
    public User findById(Integer id) {
        
    }
    
    @Override
    public List<User> findAll() {
        
    }
}
```

这里面与数据库交互，肯定需要 `JdbcTemplate` 吧，所以接下来，咱就需要构造 `JdbcTemplate` 了。

### 1.2 编写配置类

咱来编写一个 `JdbcConfiguration` ，在这里面注册 `DataSource` 和 `JdbcTemplate` 。代码很简单，而且直接从前面的 `JdbcTemplateQuickstartApplication` 中抄就可以：

```java
@Configuration
@ComponentScan("org.clxmm.spring.jdbc.c_dao")
public class JdbcConfiguration {
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/spring-dao?characterEncoding=utf8&useSSL=false");
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }
}

```

### 1.3 完善UserDaoImpl

下面就是在 `UserDaoImpl` 中编写数据库交互的逻辑咯，这里需要注入 `JdbcTemplate` 了：

```java
@Repository
public class UserDaoImpl implements UserDao {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
```

然后其余的内容，咱就不用多说了吧，都非常简单了，咱这里快速写一下过了：

```java
@Override
public void save(User user) {
  jdbcTemplate.update("insert into tbl_user (name, tel) values (?, ?)", user.getName(), user.getTel());
}

@Override
public User findById(Integer id) {
  List<User> userList = jdbcTemplate
    .query("select * from tbl_user where id = ?", new BeanPropertyRowMapper<>(User.class), id);
  return userList.size() > 0 ? userList.get(0) : null;
}

@Override
public List<User> findAll() {
  return jdbcTemplate.query("select * from tbl_user", new BeanPropertyRowMapper<>(User.class));
}
```

### 1.4 测试运行

下面咱编写一个 `JdbcTemplateDaoApplication` 启动类来检验一下编写的对不对：

```java
public class JdbcTemplateDaoApplication {
    
    public static void main(String[] args) throws Exception {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(JdbcConfiguration.class);
        UserDao userDao = ctx.getBean(UserDaoImpl.class);
        userDao.findAll().forEach(System.out::println);
    }
}
```

运行 `main` 方法，控制台可以打印出查询的 4 条数据，证明 `JdbcTemplate` 整合到 Dao 成功。

```
User{id=1, name='zhangsan', tel='110'}
User{id=2, name='lisi', tel='120'}
User{id=3, name='wangwu', tel='119'}
User{id=4, name='hahaha', tel='12345'}
```

### 1.5 可以改进的地方

仔细观察上面的代码，看看有没有什么可以优化的地方。如果看不出来不要紧，咱再写一个 `UserDaoImpl2` ：

```java
@Repository
public class UserDaoImpl implements UserDao {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
}

@Repository
public class UserDaoImpl2 implements UserDao {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
}
```

可以发现，这个 `JdbcTemplate` 的注入是重复的，这个重复代码怎么解决，我们可以来试着改进一下。

## 2. JdbcDaoSupport【掌握】

如果能有一个父类，可以把 `JdbcTemplate` 的属性依赖放入父类中，然后让所有的 Dao 实现类都去继承它，那是不是这个重复的注入就解决了？好，咱下面就以此为思路改进。

### 2.1 编写BaseDao

这里咱编写一个 `BaseDao` ，并使其为抽象类，然后在里面声明 `JdbcTemplate` 的注入即可。为了同时兼容 xml 配置和注解驱动，这里咱同时写了 setter 方法。

```java
public abstract class BaseDao {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
    
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
```

### 2.2 改造UserDaoImpl

为了不影响之前的代码，咱来修改上面的 `UserDaoImpl2` ，让它继承 `BaseDao` ，并修改 `jdbcTemplate` 的获取方式：

```java
@Repository
public class UserDaoImpl2 extends BaseDao implements UserDao {
    
    @Override
    public void save(User user) {
        // 父类private变量，此处只能用getter方法
        this.getJdbcTemplate().update("insert into tbl_user (name, tel) values (?, ?)", user.getName(), user.getTel());
    }
    
    // ......
}
```

### 2.3 进一步优化？

虽然这样写是没问题了，不过咱是不是可以继续进一步抽取一些东西呢？回过头来看看配置类：

```java
@Bean
public JdbcTemplate jdbcTemplate() {
    return new JdbcTemplate(dataSource());
}
```

这个地方必然会配置一个 `JdbcTemplate` 的 bean ，否则无法注入到 `BaseDao` 中。而 `JdbcTemplate` 是依赖 `DataSource` 的，那思路是不是就有了：如果咱把 `DataSource` 给 `BaseDao` ，让它自己创建 `JdbcTemplate` ，那是不是就不用我在配置类中再显式的声明一个 `JdbcTemplate` 了呢？

好，咱依照这个思路，继续改造 `BaseDao` ，这次咱不再需要 `JdbcTemplate` 上标注 `@Autowired` 注解了，然后添加一个 `setDataSource` 的方法：

```java
public abstract class BaseDao {
    
    // @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public JdbcTemplate getJdbcTemplate() {
        return jdbcTemplate;
    }
    
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public void setDataSource(DataSource dataSource) {
        // 如果JdbcTemplate还没有初始化，则创建一个
        if (this.jdbcTemplate == null) {
            this.jdbcTemplate = new JdbcTemplate(dataSource);
        }
    }
}
```

这样写的好处，在 xml 配置中可以体现的非常好：



可以发现，这样我们可以自由选择注入 `DataSource` 还是 `JdbcTemplate` 了，如果 IOC 容器中有定义 `JdbcTemplate` ，那就注入 `JdbcTemplate` ；如果没有定义，那也可以直接注入 `DataSource` 让它自己构造。

这样优化的目的，其实只有一个：**配置类中可以不配置 `JdbcTemplate` 了**。

### 2.4 JdbcDaoSupport的引入

好了前面铺垫那么多，下面是时候引入 `JdbcDaoSupport` 这个类了，咱想到的这些，SpringFramework 都帮我们想到了，于是它就给了这样一个类似于咱写的 `BaseDao` 的类。下面是它的核心源码，可以发现它的套路与咱的设计基本是一致的：

```java
ublic abstract class JdbcDaoSupport extends DaoSupport {

	@Nullable
	private JdbcTemplate jdbcTemplate;

	public final void setDataSource(DataSource dataSource) {
		if (this.jdbcTemplate == null || dataSource != this.jdbcTemplate.getDataSource()) {
			this.jdbcTemplate = createJdbcTemplate(dataSource);
			initTemplateConfig();
		}
	}
```

这样我们也不需要写什么 `BaseDao` 了，直接继承它就可以了。由此我们可以改造出一个 `UserDaoImpl3` ：

```java
@Repository
public class UserDaoImpl3 extends JdbcDaoSupport implements UserDao {
    
    @Override
    public void save(User user) {
        this.getJdbcTemplate().update("insert into tbl_user (name, tel) values (?, ?)", user.getName(), user.getTel());
    }
    // ......
}
```

### 2.5 JdbcDaoSupport的问题

`JdbcDaoSupport` 这玩意好是好，人家 SpringFramework 考虑的也周到，但是这有一个问题啊：继承了它之后，在 xml 配置文件中可以直接声明 `dataSource` 的注入（上面已经看到效果了），但是使用注解驱动咋办呢？

难不成我要这么写？

```java
@Repository
public class UserDaoImpl3 extends JdbcDaoSupport implements UserDao {
    
    @Autowired
    private DataSource dataSource;
    
    @PostConstruct
    public void init() {
        this.setDataSource(dataSource);
    }
```

那这也太蠢了吧，本来继承 `JdbcDaoSupport` 是为了省事的，这样反而变成费事了。

或者说我要这样写？

```java
@Repository
public class UserDaoImpl3 extends JdbcDaoSupport implements UserDao {
    
    @Autowired
    public UserDaoImpl3(DataSource dataSource) {
        this.setDataSource(dataSource);
    }
```

那也不好啊，每个类都要写一遍这个构造方法吗？很显然也不方便。。。

既然这样不行，那样不行，那我们应该怎么办才好呢？

#### 2.5.1 解决思路1：借助后置处理器

既然不想每个继承 `JdbcDaoSupport` 的类都写这么一堆东西，又想注入的话，可以考虑的策略是引入一个后置处理器，在这些 Dao 实现类的初始化过程中显式调用 `setDataSource` 方法，这样也可以实现同样的效果：

```java
public class JdbcDaoSupportPostProcessor implements BeanPostProcessor {
    
    @Autowired
    private DataSource dataSource;
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof JdbcDaoSupport) {
            JdbcDaoSupport daoSupport = (JdbcDaoSupport) bean;
            daoSupport.setDataSource(dataSource);
        }
        return bean;
    }
}
```

不过这样写的话，还是需要多写一个后置处理器，整体编码量并没有下降多少。。。

