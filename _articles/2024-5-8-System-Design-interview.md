---
layout: post
title: System Design Intervew
lang: en
description: Scale from zero to millions of users.
thumbnail: "/photos/System-Design-interview-ch1-en/image-20240508064806.png"
tags: ["Software Engineering"]
---

> Remember to pray for [Ahmed Magdy](https://twitter.com/Lynguist_0)

The first chapter begins by stating that designing a scalable system to serve millions of users is a challenging task. The process of designing such a system always requires continuous refinement and development; it's not something you do once and forget about it. Throughout this chapter, we will start with a system that serves a single user, and then gradually scale it up.
# Single server setup

We will start with the simplest setup possible, which is a single web server hosting everything: the web app, database, cache, etc., and communicating with the user. This will help us understand what happens step by step. Let's assume that the user requests this website, api.mysite.com. Your device then begins a DNS lookup and returns the IP address of the server hosting the requested site, let's say the IP address is "15.125.23.214". Once you have the IP address of the web server, you can send an HTTP request to request anything from the web server, whether it's web pages or a JSON response.

![\photos\System-Design-interview-ch1-en\image-20240508064806.png](\photos\System-Design-interview-ch1-en\image-20240508064806.png)

# Database

As your user base starts to grow, using a single server to host everything becomes impractical. So, the next step is to separate the web server from the database. We'll have each of them on its own server, which will allow you to scale each of them independently as needed.

![\photos\System-Design-interview-ch1-en\image-20240508064933.png](\photos\System-Design-interview-ch1-en\image-20240508064933.png)
  
Now we need to know what types of databases exist. The first type we have is Relational databases or SQL databases, with the most popular DBMSs being MySQL, PostgreSQL, Oracle. Relational databases represent and store data in tables and rows, allowing you to perform join operations using SQL between different tables.

The second type is Non-Relational databases or NoSQL databases, with popular management systems such as Cassandra, Neo4, etc. NoSQL databases can be categorized into four categories: key-value stores, graph stores, column stores, and document stores. Join operations are generally not supported in NoSQL databases.

When do you choose Non-relational databases?

1. If your application requires very low latency.
2. If your data is unstructured or lacks any relational data.
3. If you need to serialize and deserialize data like (JSON, XML, YAML, etc.).
4. If you need to store a large amount of data.

# Vertical scaling vs horizontal scaling

Another thing we need to know is what Vertical scaling and Horizontal scaling mean and what the difference between them is. Vertical scaling or Scale up means that you have a single server and you increase its power by increasing its resources such as RAM, CPU, etc., unlike horizontal scaling where you simply add new servers.

![\photos\System-Design-interview-ch1-en\image-20240508065110.png](\photos\System-Design-interview-ch1-en\image-20240508065110.png)

If your traffic is low, then vertical scaling is a good option due to its simplicity. However, its weakness lies in the fact that there is a limit to how much you can scale up; you can't infinitely increase RAM and CPU. Moreover, if the server fails for any reason, your entire application goes down, which leads us to the second option.
Horizontal scaling allows you to easily purchase new servers as long as servers are being manufactured. If one server fails or is under heavy load, there are many others that can handle incoming requests through the load balancer. So, what is a load balancer?
A load balancer distributes traffic to the web servers you define in the load-balanced set. The image illustrates the setup when a load balancer is added. Here, you have two servers hosting your web application within the same network.

![\photos\System-Design-interview-ch1-en\image-20240508065150.png](\photos\System-Design-interview-ch1-en\image-20240508065150.png)

If your traffic is high and the servers are not sufficient, you can simply add a new server to the web server pool, and then the load balancer will start distributing traffic among them. Everything is going well for the web servers now, but we still have one database, so what do we do if it fails?
# Database replication

The technique we use in this case is Database Replication, which is similar to the solution above but with some special considerations for the database. Here, we create replicas of the database, but with a significant relationship we base this replication on, known as master and slave.

The Master Database is dedicated to write operations in general, while the Slave is dedicated to Read operations. What happens is that the Slave database takes a copy of the data from the master database, which is highly suitable for Read-heavy systems.

Typically, the number of slave databases is greater than the number of master databases. What are the advantages of this model?

1. It provides better performance because while write/update operations are happening in the master DB, reads in the nodes of the slave DB occur in parallel.
2. Reliability: If for any reason there is a problem with any server from the DB servers, the database already exists in several copies, so we can avoid any data loss.
3. High availability: If for any reason a DB server goes offline, your application will continue to function normally because it will simply read from another database server.

Now, what happens if the DB fails? In the scenario where there was only one slave database, temporarily, read operations will switch to the master database, and once the problem is detected, a new slave database will be created to replace the one that failed. And if there are more than one slave database, the following occurs...

![\photos\System-Design-interview-ch1-en\image-20240508065300.png](\photos\System-Design-interview-ch1-en\image-20240508065300.png)

In the event that the master DB fails, there will be a promotion of one of the slave DBs to become the new master DB, and write operations will start to be directed to it. Immediately, a new slave DB will be created to replace the one that was promoted.

The author mentions that during production, the process of upgrading a slave DB to a master DB is not an easy task because the data in the slave DB may not be up-to-date, resulting in data loss. In such cases, data recovery scripts should be used to update the missing data, or replication methods like multi-masters and circular replication can be utilized. Although these methods are not covered in the book, the author provides sources for further exploration after completing the chapter.

![\photos\System-Design-interview-ch1-en\image-20240508065330.png](\photos\System-Design-interview-ch1-en\image-20240508065330.png)

# Caching

Caching is a temporary storage area typically located in memory. We use it because accessing cached data is always faster than making a request to the database and waiting for a response. Additionally, caching helps reduce the workload on the database.

![\photos\System-Design-interview-ch1-en\image-20240508071416.png](\photos\System-Design-interview-ch1-en\image-20240508071416.png)

To understand what's happening in the image above, let's imagine that a very famous person wrote a controversial tweet. At that moment, millions of people will be visiting this person's profile. So, what happens here is that every time someone requests this profile from the web server, the web server will go to the database to request the profile data.
Now with all the posts, number of followers, and all the activity tonight, imagine if millions of people entered? All these people represent a load on the database, and the data is currently being constantly requested. What do you think, since this data is being constantly requested, why don't we put it in a very fast place so that when someone requests it, it returns to them quickly, without the need to go to the database?
Or we could cache it. This is literally the benefit of caching. So, what's happening in the image is that when the web server receives a request, it will ask the cache, "Do you have this data?" If the cache has this data, it will return it to the web server to pass it back to the user. If not, it will request this data from the database, store it in the cache, and then return it to the user.

The strategy in caching is called read-through cache.
There are many strategies for caching that depend on the data type, data size, and data request rate. We can discuss these differences in a separate Blog Post later.

Now, what are the considerations when we use caching?
1. We use caching when data is read frequently but modified infrequently. Note: Caching is not suitable for persisting data because data is erased when you restart.
2. When using caching, you should pay attention to the expiration policy because the data remains in memory indefinitely if it does not expire. You should also avoid setting the expiration date too short because then you'll keep requesting the database continuously, making caching ineffective. On the other hand, setting it too long will result in outdated data that is no longer useful.
3. Consistency is an important aspect when using caching because you need to keep the cache and your data store synchronized. This becomes challenging when scaling across multiple regions because there is no single transaction that can modify both the cache and the data store simultaneously.
4. Always beware of the SPOF (single point of failure), which means that if one part of your system fails, the entire system will stop. That's why it's recommended to use multiple cache servers in multiple data centers or to allocate a certain percentage of memory beyond what you need as a reserve in case the memory gets filled up.

5. It's crucial to consider the Eviction Policy because once the cache is full, it starts evicting or removing items from your cache. There are several methods for cache eviction. 
- The most common one is the Least Recently Used (LRU), where the data least recently accessed is removed from the cache.
- Additionally, there's the Least Frequently Used (LFU), where the data accessed the fewest number of times is removed. 
- Furthermore, there's the First In First Out (FIFO), where data is removed based on the order it was inserted into the cache, similar to a queue.

![\photos\System-Design-interview-ch1-en\image-20240508072303.png](\photos\System-Design-interview-ch1-en\image-20240508072303.png)

# CDN

  
When we found the caching idea very useful for content that is frequently requested but infrequently modified, the concept of CDN emerged. A CDN is a network of distributed servers around the world designed to cache static content, and in some cases, dynamic content as well. However, the book doesn't cover it, so we can discuss it in another Blog Post.
Let's take a look at how CDN works at a high level.
If a user requests an image from your server, like this one, and your server is in Europe, for example, it will take 120 milliseconds for the image to be returned. Now, imagine if there's a server very close to the user. Instead of fetching the image from the server in Europe, it will fetch it from the nearest server to the user's location.

![\photos\System-Design-interview-ch1-en\image-20240508072519.png](\photos\System-Design-interview-ch1-en\image-20240508072519.png)

Then it will take less time, let's say 40 milliseconds, like this image. Imagine how significant the difference is? This is the function of CDN, distributing your static content across servers worldwide, and depending on the user's location, they fetch these files from the nearest server to them.
**But what if the user requests an image that is not stored on the CDN?**
In that case, the CDN will request the image from your server, cache it locally, and then serve it to the user and any subsequent users who request it without having to go back to the origin server.

1. Cost: CDN services are typically provided by third-party providers, and you are charged based on the data transfer that occurs through the CDN. If you have data that is accessed infrequently and you cache it unnecessarily, try removing it and replacing it with data that is accessed more frequently.
2. As discussed in caching considerations, always ensure that the expiration date is appropriate for the type of data so that the cached version of your data is not outdated. At the same time, the duration should not be too short, forcing you to interact with your database or server frequently for this data.

3. CDN fallback: Always have contingency plans in case the CDN fails. How will your application handle such a situation, and how will clients detect the problem and be able to request resources directly from the origin (your servers)?

4. You can delete objects from the CDN before they expire using one of two methods: first, by utilizing the API provided by the CDN providers. The second method is to use object versioning so that you can serve a second version of that object. By creating a new version of the object, you can, for example, append the version number as a parameter in the URL, like this: img.png?v=2.

# Stateless and Stateful architecture

We know that HTTP is a stateless protocol because it doesn't inherently recognize if requests sent to it are from the same user. That's why solutions for authorization like sessions stored in cookies, JWT, and similar methods emerged. However, this information can create a problem in designing a scalable system. When you send a request to a server, it gives you a session and stores it so that if you request something else from it, it knows who you are.

![\photos\System-Design-interview-ch1-en\image-20240508074701.png](\photos\System-Design-interview-ch1-en\image-20240508074701.png)

In this scenario, User A requested their profile picture from Server 1, and it was returned because the session for User A was found there. Similarly, User B did the same with Server 2, and User C with Server 3. But what do you think would happen if User A sent a request to Server 2? Right, it wouldn't respond because User A's session isn't stored on Server 2. As we discussed earlier with the load balancer, we mentioned that we might have multiple application servers, and the load balancer distributes the load among them. So, if a user was logged into one server and tried to refresh, they would be prompted to log in again because they essentially forgot them. This architecture is called the Stateful architecture, and the solution to this issue lies in most load balancers through sticky sessions. However, this isn't the ideal solution because it adds overhead, and adding or removing servers should be easy. That's why let's explore the other approach, the Stateless architecture, and how it solves this problem.
The solution is simply to add a data store that is shared among all your web servers and contains the state data. This makes it easy in terms of scalability and simplicity.

>Note: This data store can be anything, such as a relational database, Memcached/Redis, NoSQL, etc. Sometimes, they choose a NoSQL data store for its ease of scalability.

# Data center
Now let's assume that your application has become large, and users are coming from all over the world. However, your servers are still in one data center. Being wise and knowing not to put all your eggs in one basket, you decided to divide them so that x% of the traffic goes to the data center in America and the rest goes to the data center in Britain, for example. But how will users know how to reach the nearest data center to them? This happens through geoDNS, which is a DNS service that resolves the domain name to an IP address based on the user's location. In case of a data center outage for any reason, all traffic will then be routed to the available secondary data center.

![\photos\System-Design-interview-ch1-en\image-20240508074905.png](\photos\System-Design-interview-ch1-en\image-20240508074905.png)

  
Here are some challenges you should consider when setting up a multi-data center setup:

1. Traffic redirection: This involves using effective tools to route your traffic to the correct data center, such as GeoDNS.
2. Data synchronization: Users from one data center may use local databases or caches, so if there's an issue with that data center and GeoDNS redirects them to another one, the user data stored in the local databases and caches of the old data center may be lost. A common solution to this problem is to replicate the data across multiple data centers.
3. Test and deployment: If you're using a multi-data center setup, you should ensure that you test your application in different locations and use automated deployment tools to maintain consistent services across all data centers.


# Message Queue

Since we're breaking down the components of the system as we scale it, let's introduce a very important strategy in distributed systems that is widely used in real-world applications: the Message Queue.
The message queue is considered one of the pillars of your system. It resides in memory and supports asynchronous communication, acting as a buffer and distributing asynchronous requests. Its basic architecture is straightforward. It consists of input services, called producers or publishers, responsible for creating messages and publishing them to the message queue. The other part involves services or servers, known as consumers or subscribers, connected to this queue. They perform the predefined actions on the messages.

![\photos\System-Design-interview-ch1-en\image-20240508075200.png](\photos\System-Design-interview-ch1-en\image-20240508075200.png)

This architecture is preferred when building scalable and reliable applications, and you'll realize its importance in the next example. But first, imagine with me that you have a service collecting specific tasks for another service and queuing them up. Now, suppose the second service is busy with a particular task and taking some time to complete it. Should the first service wait for it to finish? No. It simply puts the task in the queue and goes on to fetch and queue more tasks. When the second service finishes its current task, it picks up a new task from the queue, and so on, even if the first service is busy.

![\photos\System-Design-interview-ch1-en\image-20240508075309.png](\photos\System-Design-interview-ch1-en\image-20240508075309.png)

As an example of this, imagine you have a website performing powerful image processing on images. When a user uploads an image, should the web server remain idle, preventing other users from using it until the processing on that image is complete? Of course not. That's why in this case, the web server (producer) takes the user's request and puts their image in the message queue. If another user uploads a different image at the same time, their image is also placed in the message queue. Then, the service (consumer) responsible for image processing takes images from the message queue one by one and processes them. Meanwhile, the web server (producer) continues to add images to the message queue as usual. The image processing service (consumer) works at its own pace, processing one image at a time and returning it to the web server, and so on.

> The producer and consumer can be scaled independently. For instance, if the size of the queue becomes large, you can increase the number of consumers to handle the workload efficiently.

# Logging, metrics, automation
If you have a small website running on three servers, logging, metrics, and automation are considered good practices but not necessary. However, as your business grows, you'll need to do this because, for example, in logging, you can monitor error logs to identify system issues. You can view the logs of each server separately or use a tool to aggregate them in a centralized service for easy searching.
Metrics are also important for understanding the health status of your system, such as CPU, memory, disk, etc., at the host level. As for the aggregated level, you can understand the performance of the DB tier and the cache tier.
As for Key business metrics, you can know the daily active users, retention, revenue, etc. Automation is also essential when your system grows and complexity increases. You need automation tools to increase productivity, such as Continuous Integration, to automate your build, test, deploy processes, and more.
# Sharding

The last thing we'll discuss in this chapter is Database scaling. We have two approaches for database scaling: the first is vertical scaling, which is similar to vertical scaling for servers, where we increase the CPU, RAM, DISK, etc., and face the same limitations.
The second approach is horizontal scaling, also known as sharding, where we add additional servers. Sharding involves dividing large databases into smaller and more manageable parts called shards. Each shard shares the same schema, although the data on each shard is unique.
Now, how do you know which shard your data is located in? Imagine we have created 4 shards. To determine the exact shard containing your data, there are several techniques, but most commonly, a hash function is used.
Here's how it works: When you input the user ID into the hash function, it returns the modulus of the user ID with the number of shards, which is 4 in this case. This way, you can determine which shard the data should be in. For example, if we have user IDs 4 or 8, applying the formula (userid % shard_size) will place them in shard number 0. Similarly, user IDs like 2 and 6 will be placed in shard number 2, as illustrated in the Images.

![\photos\System-Design-interview-ch1-en\image-20240508075814.png](\photos\System-Design-interview-ch1-en\image-20240508075814.png)

![\photos\System-Design-interview-ch1-en\image-20240508075834.png](\photos\System-Design-interview-ch1-en\image-20240508075834.png)

  
Is it necessary for the user ID to be the key on which I perform this operation? Actually, no. You can perform this operation using any sharding key, also known as a partition key. The sharding key can be a single column or multiple columns that indicate how the data should be distributed. You can understand the concept better from the video I will leave at the end of the Post, where Mr. Ahmed El-Imam explains this topic.
There are criteria you should consider when choosing the key, as the author mentioned that Sharding is a great technique to scale the database but it's far from being a perfect solution because of the complexities and challenges it adds to the system. Therefore, you should consider the following:
1. Resharding data: The author mentions that we need resharding data when a single shard is unable to handle additional data due to high data input or if a shard is experiencing shard exhaustion faster than others due to uneven data distribution. When shard exhaustion occurs, we are required to update the sharding function and move the data. In Chapter 5, the author talks about a technique called Consistent hashing, which is supposed to address this issue.
2. The Celebrity problem or hotspot key problem: Imagine you have data for many celebrities like Justin Bieber, Katy Perry, and The Rock stored in one shard. In this case, the shard will be overwhelmed by read operations, especially if your application is a social media platform. The solution is to allocate a shard for each celebrity.
3. Join and de-normalization: Once your database is divided across multiple servers, it becomes challenging to perform join operations between the database shards. The common workaround is to denormalize the database, which means combining related tables into a single table, making queries more efficient.

# The End
And thus we have reached the end of the chapter, and we've arrived at the design in front of you. Next time, we'll continue with the rest of the chapters, and I hope if there's anything I misunderstood, you'll correct me.

![\photos\System-Design-interview-ch1-en\image-20240508080335.png](\photos\System-Design-interview-ch1-en\image-20240508080335.png)

> Note: This article has been translated by AI from the original Arabic article. If you notice any mistakes, please inform me.

