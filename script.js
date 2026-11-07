// ============================================
// 1) كلاس الطالب (Class & Constructor)
// ============================================
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;                 // رقم الجلوس
    this.name = name;             // الاسم
    this.grades = grades;         // مصفوفة درجات 3 مواد
    this.attendance = attendance; // نسبة الحضور
  }

  // ============================================
  // 2) دوال التحليل الأكاديمي (Methods)
  // ============================================

  // حساب المتوسط باستخدام reduce
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // التقدير بالحروف (if/else)
  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  // النتيجة النهائية باستخدام &&
  getFinalResult() {
    const average = this.calculateAverage();
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// ============================================
// 3) نظام تشغيل الجامعة (Objects Array)
// ============================================
const studentsList = [
  new Student(1001, "أحمد علي", [90, 85, 95], 92),   // متوسط 90 -> ناجح
  new Student(1002, "سارة محمود", [70, 65, 75], 80), // متوسط 70 -> ناجح
  new Student(1003, "عمر خالد", [45, 42, 48], 85),   // متعثر (45)
  new Student(1004, "منى حسن", [40, 50, 47], 70),    // متعثر (45.67)
];

// ============================================
// 5-أ) تقرير لكل طالب
// ============================================
console.log("========== تقرير الطلاب ==========");
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(
    `الاسم: ${student.name} | المتوسط: ${average.toFixed(2)} | التقدير: ${student.getGrade(average)} | النتيجة: ${student.getFinalResult()}`
  );
});

// ============================================
// 4) لجنة الرأفة (Array Methods)
// ============================================

// الاستخراج: filter للطلاب اللي متوسطهم من 40 لـ 49
const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average < 50;
});

// المعالجة: map لإضافة 5 درجات رأفة (بنرجع كائنات جديدة من غير ما نعدل الأصل)
const mercyStudents = strugglingStudents.map((student) => {
  const oldAverage = student.calculateAverage();
  return {
    id: student.id,
    name: student.name,
    oldAverage: Number(oldAverage.toFixed(2)),
    newAverage: Number((oldAverage + 5).toFixed(2)),
  };
});

// التحليل: reduce لجمع المتوسطات الجديدة
const totalNewAverages = mercyStudents.reduce(
  (sum, student) => sum + student.newAverage,
  0
);

// متوسط الرأفة + درع الحماية من القسمة على صفر
const mercyAverage =
  mercyStudents.length === 0 ? 0 : totalNewAverages / mercyStudents.length;

// ============================================
// 5-ب) باقي المخرجات
// ============================================
console.log("========== الطلاب المتعثرين بعد الرأفة ==========");
console.log(mercyStudents);

console.log("========== متوسط المتعثرين بعد التعديل ==========");
console.log(mercyAverage.toFixed(2));
