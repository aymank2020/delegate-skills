# مراجعة أدوات التفويض

المستودع مشتق وله خمسة relay مستقلة. عيب مثبت: codex وopencode يطلقان shell على Windows دون التحقق من model/agent/variant/session، خلاف تعليق الأمان في المصدر؛ يمكن أن تُفسّر الرموز كأوامر shell. grok يحوي تحقّق token قائمًا بالفعل.

الخطة المنفذة: تحقق token قبل قراءة brief أو dispatch للمسارات المتأثرة على Windows؛ الحفاظ على سلوك POSIX وواجهات الخيارات؛ 20 اختبارًا عبر نقطة CLI الفعلية للرموز `&`, `%`, `|` وسطر جديد؛ workflow Windows؛ توثيق القيد وحدود الفحص.

المصادر: [Node child_process](https://nodejs.org/api/child_process.html)، [Node test runner](https://nodejs.org/api/test.html). الاستنتاج من عقد shell في Node والمصدر الفعلي: argv غير المقتبس لا يُعد حجة آمنة بمجرد أنه مصفوفة.

التحقق: `node --test tests/windows-arguments.test.mjs`:20/20 على Windows Node22؛ `npx skills@latest add . --list` وجد5 مهارات بلا تثبيت؛ help لكلا script المعدلين؛ `git diff --check` ناجح. المدخلات المرفوضة خرجت2 دون stdout/dispatch. لا تُطلق الاختبارات وكيلًا آخر أو تعدل المشروع المستهدف.

التكامل: خيارات relay CLI -> parseArgs الحقيقي -> رفض قبل shell -> stderr وخروج2؛ الاختبار يفشل إذا أزيل الحارس. لا مسار قديم موازٍ ولا مكتبة مشتركة جديدة بين حزم مهارات مستقلة. إطلاق implementer كامل ومدفوع لم ينفذ هنا، ومسارات أسماء ملفات تحتوي expansion syntax ليست شهادة أمان شاملة.
