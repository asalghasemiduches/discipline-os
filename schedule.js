
(async () => {
  const DB_NAME = "discipline-os-v03";
  const WEEKS = 12;
  const START_DATE = "2026-11-24";
  const ANCHOR_SATURDAY = "2026-11-21";

  // روزها: 0=شنبه، 1=یکشنبه، ...، 6=جمعه
  // [روز، شروع، پایان، عنوان، دسته، معاف از جریمه]

  const schedule = [
    // شنبه
    [0,"00:00","08:00","خواب شبانه","other",true],
    [0,"08:00","08:30","بیداری و صبحانه","other",true],
    [0,"08:30","10:30","آموزش و تمرین سئو","learning"],
    [0,"10:30","11:00","استراحت","other",true],
    [0,"11:00","13:00","طراحی سایت","project"],
    [0,"13:00","14:15","ناهار، ظرف‌ها و کارهای شخصی","other",true],
    [0,"13:00","14:00","ادمینی نوبت اول","work"],
    [0,"14:15","15:00","چای و استراحت","other",true],
    [0,"15:00","16:00","دوره سئو ـ جلسه اول","learning"],
    [0,"16:00","17:30","ادمینی نوبت دوم","work"],
    [0,"17:30","17:45","استراحت کوتاه","other",true],
    [0,"17:45","18:25","تولید محتوا ـ ایده‌پردازی و سناریونویسی","work"],
    [0,"18:30","19:15","مدیریت عمومی ـ جلسه اول","learning"],
    [0,"19:15","20:00","شام و استراحت","other",true],
    [0,"20:00","21:30","ادمینی نوبت سوم","work"],
    [0,"21:30","22:30","مطالعه آزاد ـ جلسه اول","learning"],
    [0,"22:30","23:00","آماده‌شدن برای خواب","other",true],

    // یکشنبه
    [1,"00:00","07:30","خواب شبانه","other",true],
    [1,"07:30","09:00","بیداری، صبحانه و رفتن به دانشگاه","other",true],
    [1,"09:00","17:00","دانشگاه و کلاس‌ها","study"],
    [1,"13:00","14:15","ناهار و استراحت در دانشگاه","other",true],
    [1,"13:00","14:00","ادمینی نوبت اول","work"],
    [1,"14:15","15:00","چای و استراحت در دانشگاه","other",true],
    [1,"16:00","17:00","ادمینی نوبت دوم با موبایل","work"],
    [1,"17:00","20:00","باشگاه و شام","other",true],
    [1,"20:00","22:00","ادمینی نوبت سوم","work"],
    [1,"22:00","23:00","دوره شبکه‌های اجتماعی ـ جلسه اول","learning"],
    [1,"23:00","23:30","آماده‌شدن برای خواب","other",true],

    // دوشنبه
    [2,"00:00","08:00","خواب شبانه","other",true],
    [2,"08:00","09:00","بیداری، صبحانه و آماده‌شدن","other",true],
    [2,"09:00","11:00","رفت‌وآمد و حضور در دانشگاه","study"],
    [2,"11:00","12:00","دوره دیجیتال مارکتینگ ـ جلسه اول","learning"],
    [2,"12:00","12:15","استراحت کوتاه","other",true],
    [2,"12:15","13:00","مدیریت عمومی ـ جلسه دوم","learning"],
    [2,"13:00","14:00","ناهار","other",true],
    [2,"13:00","14:00","ادمینی نوبت اول","work"],
    [2,"14:00","16:00","کلاس دانشگاه","study"],
    [2,"16:00","17:30","بازگشت، استراحت و ادمینی با موبایل","work"],
    [2,"17:30","17:45","استراحت کوتاه","other",true],
    [2,"17:45","19:45","طراحی سایت","project"],
    [2,"19:45","20:30","شام و استراحت","other",true],
    [2,"20:00","21:30","ادمینی نوبت سوم","work"],
    [2,"21:30","22:30","انگلیسی ـ جلسه اول","learning"],
    [2,"22:30","23:00","آماده‌شدن برای خواب","other",true],

    // سه‌شنبه
    [3,"00:00","08:00","خواب شبانه","other",true],
    [3,"08:00","08:30","بیداری و صبحانه","other",true],
    [3,"08:30","10:30","آموزش و تمرین سئو","learning"],
    [3,"10:30","11:00","استراحت","other",true],
    [3,"11:00","13:00","طراحی سایت","project"],
    [3,"13:00","14:15","ناهار و کارهای شخصی","other",true],
    [3,"13:00","14:00","ادمینی نوبت اول","work"],
    [3,"14:15","15:00","چای و استراحت","other",true],
    [3,"15:00","16:00","دوره شبکه‌های اجتماعی ـ جلسه دوم","learning"],
    [3,"16:00","17:00","ادمینی نوبت دوم","work"],
    [3,"17:00","20:00","باشگاه و شام","other",true],
    [3,"20:00","22:00","ادمینی نوبت سوم","work"],
    [3,"22:00","23:00","دوره دیجیتال مارکتینگ ـ جلسه دوم","learning"],
    [3,"23:00","23:30","آماده‌شدن برای خواب","other",true],

    // چهارشنبه
    [4,"00:00","08:00","خواب شبانه","other",true],
    [4,"08:00","08:30","بیداری و صبحانه","other",true],
    [4,"08:30","10:30","آموزش و تمرین سئو","learning"],
    [4,"10:30","11:00","استراحت","other",true],
    [4,"11:00","13:00","طراحی سایت","project"],
    [4,"13:00","14:15","ناهار و کارهای شخصی","other",true],
    [4,"13:00","14:00","ادمینی نوبت اول","work"],
    [4,"14:15","15:00","چای و استراحت","other",true],
    [4,"15:00","16:00","دوره سئو ـ جلسه دوم","learning"],
    [4,"16:00","17:30","ادمینی نوبت دوم","work"],
    [4,"17:30","17:45","استراحت کوتاه","other",true],
    [4,"17:45","19:15","تولید محتوا ـ ضبط","work"],
    [4,"19:15","20:00","شام و استراحت","other",true],
    [4,"20:00","21:30","ادمینی نوبت سوم","work"],
    [4,"21:30","22:30","دوره شبکه‌های اجتماعی ـ جلسه سوم","learning"],
    [4,"22:40","23:40","انگلیسی ـ جلسه دوم","learning"],
    [4,"23:40","24:00","آماده‌شدن برای خواب","other",true],

    // پنجشنبه
    [5,"00:00","08:00","خواب شبانه","other",true],
    [5,"08:00","09:00","بیداری و صبحانه","other",true],
    [5,"09:00","10:00","آماده‌شدن و رفتن به دانشگاه","other",true],
    [5,"10:00","16:00","دانشگاه و کلاس‌ها","study"],
    [5,"13:00","14:15","ناهار در دانشگاه","other",true],
    [5,"13:00","14:00","ادمینی نوبت اول","work"],
    [5,"14:15","15:00","چای و استراحت در دانشگاه","other",true],
    [5,"16:00","17:00","ادمینی نوبت دوم و مسیر بازگشت","work"],
    [5,"17:00","20:00","باشگاه و شام","other",true],
    [5,"20:00","22:00","ادمینی نوبت سوم","work"],
    [5,"22:00","23:00","دوره سئو ـ جلسه سوم","learning"],
    [5,"23:00","23:30","آماده‌شدن برای خواب","other",true],

    // جمعه
    [6,"00:00","08:00","خواب شبانه","other",true],
    [6,"08:00","08:30","بیداری و صبحانه","other",true],
    [6,"08:30","10:30","آموزش و تمرین سئو","learning"],
    [6,"10:30","11:00","استراحت","other",true],
    [6,"11:00","13:00","طراحی سایت","project"],
    [6,"13:00","14:15","ناهار و کارهای شخصی","other",true],
    [6,"13:00","14:00","ادمینی نوبت اول","work"],
    [6,"14:15","15:00","چای و استراحت","other",true],
    [6,"15:00","16:00","دوره دیجیتال مارکتینگ ـ جلسه سوم","learning"],
    [6,"16:00","17:30","ادمینی نوبت دوم","work"],
    [6,"17:30","17:45","استراحت کوتاه","other",true],
    [6,"17:45","19:15","تولید محتوا ـ ویرایش","work"],
    [6,"19:15","20:00","شام و استراحت","other",true],
    [6,"20:00","21:30","ادمینی نوبت سوم","work"],
    [6,"21:30","22:30","انگلیسی ـ جلسه سوم","learning"],
    [6,"22:40","23:40","مطالعه آزاد ـ جلسه دوم","learning"],
    [6,"23:40","24:00","آماده‌شدن برای خواب","other",true]
  ];

  // اتصال به دیتابیس فعلی پلنر
  const openRequest = indexedDB.open(DB_NAME, 1);

  const db = await new Promise((resolve, reject) => {
    openRequest.onsuccess = () => resolve(openRequest.result);
    openRequest.onerror = () => reject(openRequest.error);
  });

  if (
    !db.objectStoreNames.contains("tasks") ||
    !db.objectStoreNames.contains("settings")
  ) {
    db.close();
    throw new Error(
      "فروشگاه tasks یا settings در دیتابیس پیدا نشد."
    );
  }

  // تاریخ شروع ثابت برنامه
  const firstSaturday = new Date(
    ANCHOR_SATURDAY + "T12:00:00"
  );

  const dateFor = (week, weekday) => {
    const d = new Date(firstSaturday);

    d.setDate(
      firstSaturday.getDate() + week * 7 + weekday
    );

    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join("-");
  };

  // خواندن اطلاعات قبلی
  const existing = await new Promise((resolve, reject) => {
    const req = db.transaction("tasks", "readonly")
      .objectStore("tasks").getAll();

    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });

  // فقط وظایف خودکار نسخه قبلی حذف می‌شوند.
  const savedMeta = await new Promise((resolve, reject) => {
    const req = db.transaction("settings", "readonly")
      .objectStore("settings").get("weeklyScheduleMeta");

    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });

  const needsMigration = !savedMeta || savedMeta.version < 2;

  if (needsMigration) {
    await new Promise((resolve, reject) => {
      const tx = db.transaction("tasks", "readwrite");
      const store = tx.objectStore("tasks");

      for (const task of existing) {
        if (
          typeof task.scheduleKey === "string" &&
          task.scheduleKey.startsWith("weekly-v1-")
        ) {
          store.delete(task.id);
        }
      }

      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(
        tx.error || new Error("اصلاح وظایف قبلی ناموفق بود.")
      );
    });

    await new Promise((resolve, reject) => {
      const tx = db.transaction("settings", "readwrite");

      tx.objectStore("settings").put({
        id: "weeklyScheduleMeta",
        startDate: ANCHOR_SATURDAY,
        weeks: WEEKS,
        version: 2
      });

      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  // خواندن دوباره وظایف پس از اصلاح
  const updatedTasks = await new Promise((resolve, reject) => {
    const req = db.transaction("tasks", "readonly")
      .objectStore("tasks").getAll();

    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });

  const existingKeys = new Set(
    updatedTasks.map(t => t.scheduleKey).filter(Boolean)
  );

  const newTasks = [];

  // ساخت وظایف ۱۲ هفته‌ای از سه‌شنبه ۳ آذر
  for (let week = 0; week < WEEKS; week++) {
    for (const [
      day,
      start,
      end,
      title,
      category,
      noPenalty
    ] of schedule) {

      const date = dateFor(week, day);

      // هیچ وظیفه‌ای قبل از سه‌شنبه ۳ آذر ساخته نشود.
      if (date < START_DATE) continue;

      const scheduleKey =
        `weekly-v1-${week}-${day}-${start}-${title}`;

      // جلوگیری از ساخت وظایف تکراری
      if (existingKeys.has(scheduleKey)) continue;

      newTasks.push({
        id: (
          crypto.randomUUID
            ? crypto.randomUUID()
            : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`
        ),
        title,
        date,
        category,
        start,
        end: end === "24:00" ? "23:59" : end,
        deadline: "",
        note: noPenalty
          ? "بازه بازیابی و مراقبت؛ مشمول جریمه مالی نیست."
          : "برنامه هفتگی تکرارشونده",
        done: false,
        evidence: [],
        createdAt: Date.now(),
        scheduleKey,
        noPenalty: Boolean(noPenalty)
      });
    }
  }

  // اگر همه وظایف قبلاً ثبت شده باشند
  if (!newTasks.length) {
    db.close();

    console.log(
      "برنامه ۱۲ هفته‌ای قبلاً ثبت شده است؛ وظیفه تکراری ساخته نشد."
    );

    alert(
      "برنامه قبلاً ثبت شده است و نیازی به ثبت مجدد نیست."
    );

    return;
  }

  // ثبت وظایف جدید
  await new Promise((resolve, reject) => {
    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");

    for (const task of newTasks) {
      store.put(task);
    }

    tx.oncomplete = resolve;

    tx.onerror = () => reject(tx.error);

    tx.onabort = () => reject(
      tx.error || new Error("ثبت برنامه لغو شد.")
    );
  });

  // تاریخ شروع برنامه در تنظیمات ثبت می‌شود.
  await new Promise((resolve, reject) => {
    const tx = db.transaction("settings", "readwrite");

    tx.objectStore("settings").put({
      id: "weeklyScheduleMeta",
      startDate: ANCHOR_SATURDAY,
      weeks: WEEKS,
      version: 2
    });

    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });

  db.close();

  // تازه‌سازی داشبورد
  if (typeof window.refresh === "function") {
    await window.refresh();
  }

  console.log(
    `برنامه با موفقیت ثبت شد: ${newTasks.length} وظیفه جدید`
  );

  console.log(
    "تاریخ شروع برنامه: سه‌شنبه ۳ آذر ۱۴۰۵"
  );

  alert(
    `برنامه با موفقیت ثبت شد.\n` +
    `${newTasks.length} وظیفه جدید اضافه شد.\n` +
    `شروع برنامه: سه‌شنبه ۳ آذر ۱۴۰۵`
  );

})().catch(error => {
  console.error("خطا در ثبت برنامه هفتگی:", error);

  alert(
    "ثبت برنامه انجام نشد.\n" +
    "لطفاً خطای Console مرورگر را بررسی کن."
  );
});
