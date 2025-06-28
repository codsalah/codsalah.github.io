---
layout: post
title: "Object Orientation"
date: 2025-04-09
lang: en
tags: ["Software Engineering","OOP"]
lang_versions:
  en: /2025/04/09/object-orientaion-en  # Path to English version
  ar: /2025/04/09/object-orientaion-ar  # Path to Arabic version
---

# Objects

Object-oriented programming relies on an intuitive similarity with software simulation of physical systems and the physical systems themselves. There is a resemblance between building an algorithmic model of a physical system using software components and building a mechanical system for a physical system using concrete objects. These software components are also called objects.

Developing any mechanical model goes through three stages, which are:

1. Analysis
2. Design
3. Implementation

For example, if we are designing a mechanical model for the solar system, the analysis stage makes us realize that planets move in precise and specific orbits. In the design stage, we invent a mechanism to move the spheres (planets) in these orbits. In the implementation stage, we prepare the spheres, gears, and springs and assemble them together.

OOP also includes the same stages, but instead of concrete objects, they are replaced with software objects. The term "object" in programming refers to a component in the software model, not a component of the system being modeled. So, the correct analogy is between software objects and the objects in the real model you imagine building, not the objects in the real world. For example, orbital tracks can be represented as software objects.

This approach in programming started with Simula (a programming language dedicated to simulation), which was initially focused on solving model-building problems. The core concepts later evolved further in Smalltalk, where the primary goal of the clarity of objects was to serve as an educational tool. Since then, the object-oriented methodology has been used in a wide range of applications, such as building UI, OS, and databases, even though these applications are not tied to physical systems. Yet, the object-oriented methodology continues to be used with them.

The characteristics that give the object-oriented approach this wide range of applicability can be summarized as follows:

- The analogy between software models and physical models.
- The resilience of software models.
- The reusability of the components of software models.

The first point relates to analysis. The analogy with a physical model can be useful in developing a software model, which is why significant effort has been put into the analysis process.

The second point relates to design. The resilience of the design in the face of changes comes from abstractions. Objects form natural abstraction boundaries for data and help you focus the design on system structure rather than algorithms. Algorithms become methods associated with objects, which makes objects behaviorally independent. Because of these object abstractions, the design can evolve without major radical changes.

The third point relates to implementation. Objects are naturally organized into taxonomies during analysis, design, and implementation. This hierarchical structure encourages the reuse of methods and data higher up in the hierarchy, as happens with inheritance.

Object-oriented programming is not the only approach with these characteristics. We can model systems using other paradigms, such as those based on traditional concepts like algorithms and data structures, which were not developed enough when Simula appeared. Resilience can be achieved in the same way by organizing programs around abstract data types without needing taxonomies. In fact, some people consider data abstraction to be the essence of object orientation. Reusability can be achieved through modularization and parameterization. Therefore, with the increasing availability and awareness of other techniques, the appeal of objects may decrease. However, object-oriented programming has proven its success by providing a unified and easy-to-understand framework that combines analysis, design, and implementation, not to mention that some of its core concepts are easy to explain.

# Reuse

A software component is reusable when it can be used in more than one context. For example, a module can be reused when you import it into other modules, and a generic module can be reused by instantiating it with different parameters. However, in general, reuse requires replacing one component with another in the context.

In traditional procedural languages, this replacement requires exact agreement in type or interface. But in object-oriented languages, there are two distinct types of replacements:

- Objects can be replaced with other objects.
- Methods can be replaced with other methods.

These forms of replacements do not require exact agreement in type or interface; approximate agreement is sufficient.

There are many mechanisms that allow you to replace objects, but in general, you can replace an object with a new object that has at least the same attributes. Any additional attributes in the new object remain invisible attributes, preserved but not directly accessible.

Replacing methods is called overriding, while reusing an existing method is called inheritance.

New objects, or new generators for objects, are derived from older objects through a combination of reuse (inheritance) and variation (overriding). When overriding a method with a new method, the new method must comply with the interface of the old one, but with some flexibility. Specifically, the new method can be more specific than the old method, either in its interface or behavior, and it can use attributes available only in the derived objects.

As an almost inevitable result of these replacement mechanisms, the concept of `self` emerges. With the special name `self`, a method can refer to its host object and, consequently, to other methods in the same object (sibling methods).

Through inheritance and overriding, the siblings of a method can change, which is why `self` has a dynamic meaning, always providing access to the current siblings of the method.

This dynamic notion of `self` is very important because it allows a method to exhibit new behavior when inherited in a derived object, depending on the siblings it finds there. Without the concept of `self`, the behavior of methods would be more rigid, and method reuse would be limited.

Another result of these replacement mechanisms is that methods are closely bound to objects. Due to the flexibility in replacing objects and methods, it’s not possible to statically determine the exact type of all objects that might be dynamically bound to a variable or whether those objects have invisible attributes. It’s also not possible to statically determine the methods a specific object possesses or whether those methods rely on invisible attributes of their host object. If you extract a method from an object and try to reuse it in a context that doesn’t provide the appropriate invisible attributes, it won’t be valid. Therefore, unlike procedures that operate on data structures, methods are fundamental and inseparable parts of objects.

> Note: This article has been translated by AI from the original Arabic article. If you notice any mistakes, please inform me.