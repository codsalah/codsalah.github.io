---
layout: post
title: "Object Orientation"
date: 2025-04-09
direction: rtl
lang: ar
tags: ["Software Engineering","OOP"]
lang_versions:
  en: /2025/04/09/object-orientaion-en  
  ar: /2025/04/09/object-orientaion-ar 
---


# الـ Objects

الـ object-oriented في البرمجة بيعتمد على تشابه بديهي مع الـ Software Simulation للـ physical systems والـ physical systems نفسها. في تشابه بين إنك تبني نموذج Algorithmic لنظام فيزيائي بإستخدام الـ software components وبين إنك تبني نظام ميكانيكي لنظام فيزيائي بإستخدام الـ Concrete objects، وبرضو الـ software components دي بيتقال عليها objects.

تطوير أي mechanical model بيعدي على 3 مراحل، وهي:

1. Analysis
2. Design
3. Implementation

كمثال على ده، لو هنصمم mechanical model للنظام الشمسي، مرحلة الـ analysis بتخلينا نُدرك إن الكواكب بتتحرك في مدارات دقيقة ومحددة، ومرحلة الـ Design بنخترع فيها آلية تحرك الكُرات (الكواكب) في المدارات دي، وفي مرحلة الـ Implementation بنجهز الكُرات والتروس والزنبركات وبنجمعهم مع بعض.

الـ OOP برضو بتتضمن نفس المراحل، بس بدل الـ concrete objects بيتم استبدالها بـ software objects. مصطلح الـ object في البرمجة المقصود بيه component في الـ software model، مش component من الـ system اللي بيتعمله موديلينج. فـ التشبيه الصحيح بيكون بين الـ software objects والـ objects في الـ real model اللي بتتخيل إنك بتبنيه، مش الـ objects في الـ real world. كمثال على ده، الـ orbital tracks ممكن نقدر نمثلها كـ software objects.

الـ approach ده في البرمجة ابتدى مع Simula (لغة برمجة خاصة بالـ simulation) اللي كانت في الأول مُكرسة لحل مشاكل الـ model building. المفاهيم الأساسية بعدين اتطورت أكتر في لغة Smalltalk، واللي كان الهدف الأساسي من وضوح الـ objects فيها هو إنها تكون أداة تعليمية. ومن وقتها، الـ object-oriented methodology تم استخدامها في نطاق واسع من الـ applications، زي بناء الـ UI والـ OS والـ Databases، مع إن الـ applications دي مش مرتبطة بالـ physical systems، لكن لحد دلوقتي الـ object-oriented methodology مستمرة معاها.

الخواص اللي بتدي الـ object-oriented approach النطاق الواسع ده من الـ applicability ممكن نلخصها كالتالي:

- التشبيه بين الـ software models والـ physical models.
- الـ resilience (ثبات) بتاعت الـ software models.
- الـ reusability بتاعت الـ components بتاعت الـ software models.

النقطة الأولى بتتعلق بالـ analysis، التشبيه مع الـ physical model ممكن يكون مفيد في تطوير الـ software model، عشان كده اتعمل مجهود كبير في عملية الـ analysis.

النقطة التانية بتتعلق بالـ design، الـ resilience بتاعت الـ design في مواجهة التغييرات بتيجي بناءً على الـ abstractions. الـ objects بتشكل abstraction boundaries طبيعية للـ data وبتساعدك تركز الـ design على system structure بدل الـ algorithms. الـ algorithms بتتحول لـ methods بترتبط بالـ objects، وده بيخلي الـ objects سلوكيًا مستقلة، فبسبب الـ object abstractions دي الـ design ممكن يتطور من غير تغييرات جذرية كبيرة.

النقطة التالتة بتتعلق بالـ implementation، الـ objects بتترتب بشكل طبيعي في taxonomies خلال الـ analysis والـ design والـ implementation. الهيكلة الهرمية دي بتشجع على الـ reuse لـ methods والـ data اللي موجودين فوق في الـ hierarchy دي، زي ما بيحصل في الـ inheritance.

الـ Object-oriented programming مش هي الوحيدة اللي عندها الخواص دي. احنا ممكن نعمل modeling لـ systems بـ paradigms تانية، زي اللي قايمة على مفاهيم تقليدية زي الـ algorithms والـ data structures اللي مكانتش متطورة كفاية لما Simula ظهرت. الـ resilience ممكن تتحقق بنفس الطريقة عن طريق تنظيم الـ programs حوالين abstract data types من غير ما نحتاج الـ taxonomies. في الحقيقة، في ناس بتعتبر إن الـ data abstraction هي جوهر الـ object orientation. الـ reusability ممكن تتحقق عن طريق الـ modularization والـ parameterization. فـ بالتالي، ممكن مع زيادة توافر ووعي بـ techniques تانية، جاذبية الـ objects تقل. ومع ذلك، الـ object-oriented أثبتت نجاحها عن طريق إنها قدرت توفر framework موحد وسهل الفهم بيجمع بين الـ analysis والـ design والـ implementation، ده غير إن بعض المفاهيم الأساسية فيها سهل إنك تفسرها.

# الـ Reuse

الـ software component بيكون reusable لما ينفع يُستخدم في أكتر من context واحد. مثلاً، الـ module ممكن تعيد استخدامه لما تعمله import في modules تانية، والـ generic module ممكن ترجع تستخدمه عن طريق إنك تعمله instantiate بـ Parameters مختلفة. لكن عمومًا، الـ reuse بيتطلب استبدال الـ component بـ component تاني في الـ context.
في الـ traditional procedural languages، الاستبدال ده بيحتاج exact agreement في الـ type أو الـ interface. لكن في الـ object-oriented languages، في نوعين مميزين من الـ replacements:

- الـ objects ممكن تستبدل بـ objects تانية.
- الـ methods ممكن تستبدل بـ methods تانية.

أشكال الـ replacements دي مش بتتطلب exact agreement في الـ type أو الـ interface، يكفي إنهم يكونوا approximate agreement.

فيه mechanisms كتيرة بتسمحلك تستبدل الـ objects، بس بشكل عام ممكن تستبدل object بـ object جديد عنده على الأقل نفس الـ attributes، وأي attributes زيادة في الـ object الجديد ده بتفضل كـ invisible attributes، بتكون preserved بس مش directly accessible.

إستبدال الـ methods بيتقال عليه overriding لكن الـ reuse لـ method موجودة بيتقال عليه inheritance.

الـ objects الجديدة، أو الـ generators الجديدة للـ objects بتُشتق من الـ objects القديمة عن طريق مزيج من الـ reuse (inheritance) و الـ variation (overriding). لما بنعمل override لـ method بـ method جديدة، الـ method الجديدة لازم تتوافق مع الـ interface بتاع القديم، بس بمرونة معينة، بالأخص الـ method الجديدة ممكن تكون more specific من الـ method القديمة، سواء في الـ interface أو الـ behavior بتاعها، وممكن تستخدم attributes متوفرة بس في الـ objects المُشتقة دي.

وكنتيجة شبه حتمية للـ replacement mechanisms دي هي مفهوم الـ `self`. بالـ special name `self` الـ method ممكن تـ refer للـ host object بتاعها، وبالتالي الـ methods التانية اللي في نفس الـ object (sibling methods).

من خلال الـ inheritance والـ overriding، الـ siblings بتاعت الـ method ممكن تتغير، عشان كده الـ self عندها dynamic meaning، دايمًا بتدي access للـ current siblings بتاعت الـ method.

الـ dynamic notion ده للـ self مهم جدًا لإنه بيسمح للـ method إنها تظهر سلوك جديد لما تتورث في الـ derived object، حسب الـ siblings اللي بيلاقيها هناك. من غير مفهوم الـ self، سلوك الـ methods بيكون أكتر جمود والـ method reuse بيكون limited.

نتيجة تانية للـ replacement mechanisms دي إن الـ methods بتكون closely bound بالـ objects. بسبب الـ flexibility في استبدال الـ objects والـ methods، مش ممكن نعرف بشكل static النوع الدقيق لكل الـ objects اللي ممكن تبقى dynamically bound بـ variable ولا إذا كان الـ objects دي عندها invisible attributes. وكمان مش ممكن تعرف بشكل static الـ methods اللي object معين بيمتلكها، ولا إذا كان الـ methods دي بتعتمد على invisible attributes بتاعت الـ host object بتاعها. لو استخرجت method من object وحاولت تعمله reuse في context مش بيوفر الـ invisible attributes المناسبة، ده مش هيبقى سليم. عشان كده، عكس الـ procedures اللي بتشتغل على داتا ستراكشرز، الـ methods بتكون أجزاء أساسية وغير منفصلة من الـ objects.