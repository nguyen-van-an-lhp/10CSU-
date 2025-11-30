
import { Student, Notification, SubjectCombo, ScheduleItem, TeacherProfile, User, Activity, ExamSchedule, Task, TimelineEvent } from './types';

export const ACCOUNTS: Record<string, User & { password: string }> = {
  "nguyenvanan": { username: "nguyenvanan", password: "Binhan@542001", displayName: "Nguyễn Văn An", role: "admin" },
  "loptruong": { username: "loptruong", password: "Phongsuquan@2025", displayName: "Lớp Trưởng", role: "monitor" },
  "phokyluat": { username: "phokyluat", password: "Kyluat@2025", displayName: "Lớp Phó Kỷ Luật", role: "vice_discipline" },
  "phohoctap": { username: "phohoctap", password: "Hoctap@2025", displayName: "Lớp Phó Học Tập", role: "vice_academic" },
  "bithu": { username: "bithu", password: "Bithu@2025", displayName: "Bí Thư", role: "secretary" }
};

export const TEACHER_PROFILE: TeacherProfile = {
  name: "Nguyễn Văn An",
  degrees: [
    "Cử nhân Sư phạm Lịch Sử – Đại học Sư phạm TP.HCM",
    "Thạc sĩ Lịch Sử Việt Nam – Đại học Sư phạm TP.HCM"
  ],
  phone: "0326830265",
  email: "an.v.nguyen@lehongphong.edu.vn",
  address: "25/4 Trần Thị Trọng, P.Tân Sơn, Tp.HCM",
  image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop" 
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
    { id: 1, date: "15/08/2025", title: "Tựu trường & Nhận lớp", description: "Học sinh tập trung tại phòng A.204 để nghe phổ biến quy chế.", status: 'completed' },
    { id: 2, date: "05/09/2025", title: "Lễ Khai Giảng", description: "Lễ khai giảng năm học mới tại sân trường.", status: 'upcoming' },
    { id: 3, date: "20/10/2025", title: "Thi Giữa Kỳ I", description: "Tập trung ôn tập các môn Toán, Văn, Anh và Môn Chuyên.", status: 'upcoming' },
];

export const TASKS: Task[] = [
  { id: 1, title: "Nộp bài thu hoạch Củ Chi", deadline: "10/01/2025", type: 'academic', isCompleted: false },
  { id: 2, title: "Đăng ký chuyên đề", deadline: "12/01/2025", type: 'other', isCompleted: false },
  { id: 3, title: "Tập văn nghệ 9/1", deadline: "08/01/2025", type: 'movement', isCompleted: true },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  { 
    id: 1, 
    date: "04/07/2025", 
    title: "Kế hoạch nhập học HK I", 
    content: "GVCN thông báo về thời gian và địa điểm tập trung nhận lớp năm học mới.", 
    fullContent: "<p>Kính gửi Quý Phụ huynh và các em học sinh,</p><p>Để chuẩn bị tốt nhất cho năm học mới 2025-2026, GVCN xin thông báo lịch tập trung như sau:</p><ul><li><strong>Thời gian:</strong> 7h30 ngày 15/08/2025</li><li><strong>Địa điểm:</strong> Phòng A.204 - Khu B</li><li><strong>Nội dung:</strong><ul><li>Ổn định tổ chức lớp.</li><li>Bầu Ban Cán Sự tạm thời.</li><li>Phổ biến nội quy nhà trường.</li></ul></li></ul><p>Đề nghị các em học sinh có mặt đúng giờ, trang phục lịch sự (Áo sơ mi trắng, quần tây sẫm màu).</p><p>Trân trọng,<br><em>Thầy Nguyễn Văn An</em></p>",
    isPinned: true, 
    authorRole: 'admin',
    authorUsername: 'nguyenvanan',
    authorName: "Nguyễn Văn An", 
    category: 'general' 
  },
  { 
    id: 2, 
    date: "03/07/2025", 
    title: "Nhắc nhở nề nếp đầu tuần", 
    content: "Lớp Phó Kỷ Luật nhắc nhở các tổ thực hiện nghiêm túc quy định đồng phục.", 
    fullContent: "<p>Chào các bạn,</p><p>Tuần vừa qua lớp chúng ta đã có một số bạn vi phạm lỗi trang phục. Để giữ vững danh hiệu Lớp Tiên Tiến, Ban Cán Sự nhắc nhở:</p><ol><li>Nam sinh phải sơ vin, mang giày bata hoặc sandal có quai hậu.</li><li>Nữ sinh mặc áo dài vào thứ 2 và các ngày lễ.</li><li>Đeo huy hiệu đoàn/trường đầy đủ.</li></ol><p>Các tổ trưởng vui lòng kiểm tra thành viên tổ mình trước 6h45 hàng ngày.</p>",
    authorRole: 'vice_discipline', 
    authorUsername: 'phokyluat',
    authorName: "Văn Thiên Nam", 
    category: 'discipline' 
  }
];

export const STUDENTS: Student[] = [
  { id: 1, name: "Vương Thiên Ân", gender: "Nữ", dob: "27/06/2010", pob: "TP.HCM" },
  { id: 2, name: "Kiều Nguyễn Quỳnh Anh", gender: "Nữ", dob: "01/12/2010", pob: "TP.HCM" },
  { id: 3, name: "Võ Tú Anh", gender: "Nữ", dob: "11/11/2010", pob: "TP.HCM" },
  { id: 4, name: "Đoàn Ngọc Bảo Châu", gender: "Nữ", dob: "06/08/2010", pob: "TP.HCM", role: "Lớp Trưởng" },
  { id: 34, name: "Nguyễn Nguyệt Minh", gender: "Nữ", dob: "15/08/2010", pob: "TP.HCM", role: "Lớp Phó Học Tập" },
  { id: 5, name: "Nguyễn Linh Đan", gender: "Nữ", dob: "13/07/2010", pob: "TP.HCM" },
  { id: 6, name: "Tống Nguyễn Kim Duyên", gender: "Nữ", dob: "19/07/2010", pob: "TP.HCM" },
  { id: 7, name: "Trần Lương Ngọc Giàu", gender: "Nữ", dob: "10/05/2010", pob: "TP.HCM" },
  { id: 8, name: "Lê Bảo Hân", gender: "Nữ", dob: "02/05/2010", pob: "TP.HCM" },
  { id: 9, name: "Lã Đức Huy", gender: "Nam", dob: "09/09/2010", pob: "TP.HCM" },
  { id: 10, name: "Huỳnh Trương Văn Khải", gender: "Nam", dob: "12/01/2010", pob: "TP.HCM" },
  { id: 11, name: "Đỗ Phi Khanh", gender: "Nữ", dob: "16/01/2010", pob: "TP.HCM" },
  { id: 12, name: "Nguyễn Ngọc Vân Khanh", gender: "Nữ", dob: "13/04/2010", pob: "TP.HCM" },
  { id: 13, name: "Nguyễn Cảnh Khôi", gender: "Nam", dob: "29/12/2010", pob: "TP.HCM" },
  { id: 14, name: "Nguyễn Tấn Kiệt", gender: "Nam", dob: "10/07/2010", pob: "TP.HCM" },
  { id: 15, name: "Nguyễn Thụy Mỹ Linh", gender: "Nữ", dob: "17/04/2010", pob: "Đắk Lắk" },
  { id: 16, name: "Văn Thiên Nam", gender: "Nam", dob: "02/11/2010", pob: "Thừa Thiên Huế", role: "Lớp Phó Kỷ Luật" },
  { id: 17, name: "Tạ Ngọc Phương Nghi", gender: "Nữ", dob: "12/01/2010", pob: "TP.HCM" },
  { id: 18, name: "Lê Giáng Ngọc", gender: "Nữ", dob: "24/12/2010", pob: "Sóc Trăng" },
  { id: 19, name: "Đặng Thanh Trọng Nhân", gender: "Nam", dob: "16/09/2010", pob: "TP.HCM" },
  { id: 20, name: "Nguyễn Hoàng Nhi", gender: "Nữ", dob: "12/02/2010", pob: "TP.HCM" },
  { id: 21, name: "Nguyễn Đinh Ngọc Phước", gender: "Nam", dob: "02/11/2010", pob: "Khánh Hòa" },
  { id: 22, name: "Lê Nguyễn Mai Phương", gender: "Nữ", dob: "17/09/2010", pob: "TP.HCM" },
  { id: 23, name: "Nguyễn Lâm Quyên", gender: "Nữ", dob: "22/03/2010", pob: "TP.HCM" },
  { id: 24, name: "Đặng Nguyễn Hoàng Thiên", gender: "Nam", dob: "14/02/2010", pob: "TP.HCM" },
  { id: 25, name: "Trần Trí Thịnh", gender: "Nam", dob: "04/05/2010", pob: "TP.HCM" },
  { id: 26, name: "Lê Trịnh Minh Thư", gender: "Nữ", dob: "24/02/2010", pob: "TP.HCM" },
  { id: 27, name: "Ngô Huỳnh Khánh Thy", gender: "Nữ", dob: "11/06/2010", pob: "TP.HCM" },
  { id: 28, name: "Đỗ Thùy Tiên", gender: "Nữ", dob: "13/02/2010", pob: "TP.HCM" },
  { id: 29, name: "Dương Chánh Tín", gender: "Nam", dob: "14/02/2010", pob: "TP.HCM", role: "Bí Thư" },
  { id: 30, name: "Đinh Đức Trí", gender: "Nam", dob: "12/05/2010", pob: "TP.HCM" },
  { id: 31, name: "Trương Quốc Triều", gender: "Nam", dob: "31/12/2010", pob: "TP.HCM" },
  { id: 32, name: "Nguyễn Minh Trung", gender: "Nam", dob: "20/02/2010", pob: "TP.HCM" },
  { id: 33, name: "Trần Lê Như Ý", gender: "Nữ", dob: "18/03/2010", pob: "TP.HCM" }
];

export const SCHEDULE: ScheduleItem[] = [
    { id: "s21", day: "Thứ 2", session: "Sáng", period: 1, time: "07:30 - 08:15", subject: "Chào Cờ" },
    { id: "s22", day: "Thứ 2", session: "Sáng", period: 2, time: "08:20 - 09:05", subject: "Sinh Hoạt CN" },
    { id: "s23", day: "Thứ 2", session: "Sáng", period: 3, time: "09:25 - 10:10", subject: "Lịch Sử Chuyên" },
    { id: "s24", day: "Thứ 2", session: "Sáng", period: 4, time: "10:15 - 11:00", subject: "Lịch Sử Chuyên" },
    { id: "s25", day: "Thứ 2", session: "Sáng", period: 5, time: "11:05 - 11:50", subject: "Lịch Sử Chuyên" },
    { id: "s31", day: "Thứ 3", session: "Sáng", period: 1, time: "07:30 - 08:15", subject: "Toán" },
    { id: "s32", day: "Thứ 3", session: "Sáng", period: 2, time: "08:20 - 09:05", subject: "Toán" },
    { id: "s33", day: "Thứ 3", session: "Sáng", period: 3, time: "09:25 - 10:10", subject: "Ngữ Văn" },
    { id: "s34", day: "Thứ 3", session: "Sáng", period: 4, time: "10:15 - 11:00", subject: "Ngữ Văn" },
    { id: "s41", day: "Thứ 4", session: "Sáng", period: 1, time: "07:30 - 08:15", subject: "Tiếng Anh" },
    { id: "s42", day: "Thứ 4", session: "Sáng", period: 2, time: "08:20 - 09:05", subject: "Tiếng Anh" },
    { id: "s51", day: "Thứ 5", session: "Sáng", period: 1, time: "07:30 - 08:15", subject: "Tin Học" },
    { id: "s52", day: "Thứ 5", session: "Sáng", period: 2, time: "08:20 - 09:05", subject: "Tin Học" },
    { id: "s61", day: "Thứ 6", session: "Sáng", period: 1, time: "07:30 - 08:15", subject: "Vật Lí" },
    { id: "s62", day: "Thứ 6", session: "Sáng", period: 2, time: "08:20 - 09:05", subject: "Hóa Học" },
    { id: "c21", day: "Thứ 2", session: "Chiều", period: 1, time: "13:00 - 13:45", subject: "GDQP" },
    { id: "c41", day: "Thứ 4", session: "Chiều", period: 1, time: "13:00 - 13:45", subject: "Chuyên Đề Sử" },
];

export const EXAMS: ExamSchedule[] = [
  { id: 1, subject: "Toán", date: "15/10/2025", time: "07:30", duration: 90, type: "Giữa Kỳ" },
  { id: 2, subject: "Ngữ Văn", date: "16/10/2025", time: "07:30", duration: 90, type: "Giữa Kỳ" },
  { id: 3, subject: "Lịch Sử Chuyên", date: "17/10/2025", time: "08:00", duration: 120, type: "Giữa Kỳ" },
  { id: 4, subject: "Tiếng Anh", date: "18/10/2025", time: "09:30", duration: 60, type: "Giữa Kỳ" },
];

export const COMBINATIONS: Record<string, SubjectCombo[]> = {
  "Khối A": [
    { code: "A03", subjects: "Toán, Vật lí, Lịch sử" },
    { code: "A05", subjects: "Toán, Hóa học, Lịch sử" },
    { code: "A07", subjects: "Toán, Lịch sử, Địa lí" },
  ],
  "Khối C": [
    { code: "C00", subjects: "Ngữ văn, Lịch sử, Địa lí" },
    { code: "C03", subjects: "Ngữ văn, Toán, Lịch sử" },
    { code: "C19", subjects: "Ngữ văn, Lịch sử, GD Kinh tế & Pháp luật" },
  ],
  "Khối D": [
    { code: "D09", subjects: "Toán, Lịch sử, Tiếng Anh" },
    { code: "D14", subjects: "Ngữ văn, Lịch sử, Tiếng Anh" },
    { code: "D64", subjects: "Ngữ văn, Lịch sử, Tiếng Pháp" },
  ]
};

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "Hội Trại Truyền Thống 9/1",
    date: "09/01/2025",
    summary: "10CSU bùng nổ sức trẻ tại Hội trại truyền thống với giải Nhất toàn đoàn.",
    fullContent: "<p>Trong không khí hân hoan chào mừng ngày Học sinh - Sinh viên 9/1, tập thể 10CSU đã tham gia Hội trại truyền thống với tinh thần nhiệt huyết cao độ.</p><p>Với chủ đề <strong>'Hào khí Đông A'</strong>, trại của lớp đã xuất sắc chinh phục Ban giám khảo và giành <strong>Giải Nhất toàn đoàn</strong> phần thi Cổng trại.</p><p>Bên cạnh đó, các tiết mục văn nghệ và trò chơi dân gian cũng để lại nhiều ấn tượng sâu sắc.</p>",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    gallery: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop"
    ],
    authorName: "Dương Chánh Tín",
    authorUsername: "bithu"
  },
  {
    id: 2,
    title: "Về Nguồn: Địa Đạo Củ Chi",
    date: "22/12/2024",
    summary: "Chuyến đi thực tế học tập lịch sử đầy ý nghĩa tại vùng Đất Thép.",
    fullContent: "<p>Thực hiện kế hoạch giáo dục truyền thống, tập thể 10CSU đã có chuyến đi thực tế tại Khu di tích lịch sử Địa đạo Củ Chi.</p><p>Tại đây, các em đã được:</p><ul><li>Dâng hương tại Đền Bến Dược.</li><li>Xem phim tư liệu về cuộc kháng chiến chống Mỹ.</li><li>Trải nghiệm chui hầm và tìm hiểu về bếp Hoàng Cầm.</li></ul><p>Chuyến đi không chỉ mang lại kiến thức lịch sử sống động mà còn gắn kết tình cảm giữa các thành viên trong lớp.</p>",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=2070&auto=format&fit=crop",
    gallery: [
        "https://images.unsplash.com/photo-1533230676238-60032e2d93ee?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598556776374-1b7b4a53074d?q=80&w=2070&auto=format&fit=crop"
    ],
    authorName: "Nguyễn Văn An",
    authorUsername: "nguyenvanan"
  }
];
