const fs = require('fs');

const original10 = [
  {
    "id": 1,
    "question": "Khi học viên thi xong cuối khóa SC1, Sale nên mở đầu tin nhắn như thế nào để tạo ấn tượng tốt nhất?",
    "options": [
      "Gửi ngay bảng học phí SC2 để chốt sale",
      "Gửi điểm số đạt được, chúc mừng và khen ngợi sự cố gắng của học viên",
      "Hỏi xem học viên có muốn học tiếp không",
      "Im lặng chờ học viên tự liên hệ"
    ],
    "correctAnswer": 1,
    "explanation": "Báo điểm kèm lời khen giúp học viên có cảm xúc tích cực, dễ dàng đón nhận các tư vấn tiếp theo."
  },
  {
    "id": 2,
    "question": "Nếu khách hàng báo bị trùng lịch học t2-4-6, cách xử lý KHÉO LÉO nhất là gì?",
    "options": [
      "Bảo khách khi nào rảnh thì học sau",
      "Đưa ra ngay phương án lịch học t3-5-7 hoặc một khóa khai giảng khác phù hợp hơn",
      "Xin lỗi khách và ngắt kết nối",
      "Khuyên khách bỏ lịch cá nhân để học"
    ],
    "correctAnswer": 1,
    "explanation": "Sale không bao giờ được bỏ cuộc. Khách bận lịch này phải lập tức offer lịch khác (3-5-7) hoặc giờ học khác."
  },
  {
    "id": 3,
    "question": "Để học viên có hứng thú đăng ký khóa tiếp theo (SC2), Sale nên sử dụng mồi câu nào?",
    "options": [
      "Hứa hẹn học phí sẽ rẻ hơn nếu đóng ngay",
      "Chỉ ra những hạn chế của SC1 và ép học SC2",
      "Gửi Sổ tay từ vựng & ngữ pháp SC2 (dạng PDF) tặng trước để học viên tò mò",
      "Đe dọa nếu không học sẽ quên kiến thức"
    ],
    "correctAnswer": 2,
    "explanation": "Tặng quà trước (tài liệu học) giúp kích thích sự tò mò và tạo giá trị trước khi chốt sale."
  },
  {
    "id": 4,
    "question": "Thay vì chỉ tư vấn một khóa lẻ tẻ (SC2), Sale nên làm gì để tăng giá trị vòng đời học viên?",
    "options": [
      "Tư vấn lộ trình dài hạn (Combo SC2+SC3 hoặc SC2+Giao tiếp) kèm ưu đãi đặc biệt",
      "Chỉ tập trung chốt SC2 cho nhanh",
      "Khuyên học viên tự học ở nhà",
      "Chờ học viên tự hỏi về lộ trình dài hạn"
    ],
    "correctAnswer": 0,
    "explanation": "Upsell combo giúp tăng doanh thu và mang lại cam kết học tập dài hạn cho học viên."
  },
  {
    "id": 5,
    "question": "Yếu tố nào giúp chốt sale hiệu quả trong lúc khách hàng đang do dự?",
    "options": [
      "Thúc giục liên tục",
      "Tạo sự khan hiếm (ví dụ: chỉ còn 2 slot ưu đãi, ưu đãi kết thúc trong hôm nay)",
      "Bỏ qua và tìm khách khác",
      "Giảm giá vô tội vạ"
    ],
    "correctAnswer": 1,
    "explanation": "Tạo sự khan hiếm là kỹ năng chốt sale kinh điển giúp thúc đẩy quyết định của khách hàng."
  },
  {
    "id": 6,
    "question": "Trong quá trình học viên đang học (sắp kết khóa), hành động nào của Sale thể hiện sự quan tâm chuyên nghiệp?",
    "options": [
      "Không nhắn tin gì để tránh làm phiền",
      "Nhắn tin hỏi thăm tình hình học tập, vướng mắc để hỗ trợ kịp thời",
      "Chỉ nhắn tin khi cần thu học phí",
      "Chờ giáo viên báo cáo rồi mới xử lý"
    ],
    "correctAnswer": 1,
    "explanation": "Chăm sóc khách hàng chủ động giúp tăng độ hài lòng và tỷ lệ đăng ký khóa tiếp theo."
  },
  {
    "id": 7,
    "question": "Để thủ tục đăng ký chuyên nghiệp và gọn gàng, Sale cần gửi những gì cho học viên?",
    "options": [
      "Chỉ gửi số tài khoản",
      "Gửi form đăng ký, thông tin chuyển khoản và hướng dẫn chi tiết",
      "Yêu cầu học viên tự lên website tìm hiểu",
      "Gọi điện thoại nói miệng"
    ],
    "correctAnswer": 1,
    "explanation": "Thông tin rõ ràng, đầy đủ giúp học viên dễ dàng thực hiện thao tác và thấy được sự chuyên nghiệp."
  },
  {
    "id": 8,
    "question": "Khi yêu cầu học viên chuyển khoản, Sale cần cung cấp thông tin gì rõ ràng nhất?",
    "options": [
      "Chỉ cần tên ngân hàng",
      "Số tài khoản, tên chủ tài khoản, ngân hàng và cú pháp chuyển khoản chính xác",
      "Số tiền cần chuyển",
      "Tên chi nhánh ngân hàng"
    ],
    "correctAnswer": 1,
    "explanation": "Cú pháp và thông tin chính xác giúp trung tâm dễ dàng đối soát và tránh sai sót."
  },
  {
    "id": 9,
    "question": "Học viên phản hồi là link bài test bị LỖI không mở được, Sale nên:",
    "options": [
      "Bảo học viên tự kiểm tra lại mạng",
      "Xin lỗi, kiểm tra lại link ngay lập tức và gửi link mới hoặc hướng dẫn cách mở",
      "Đổ lỗi cho bộ phận kỹ thuật",
      "Bỏ qua tin nhắn"
    ],
    "correctAnswer": 1,
    "explanation": "Xử lý sự cố nhanh chóng, nhận trách nhiệm và đưa ra giải pháp là thái độ CSKH chuyên nghiệp."
  },
  {
    "id": 10,
    "question": "Việc gửi 'Sổ tay từ vựng & ngữ pháp SC2' dưới định dạng PDF cho học viên trước khi họ đăng ký có tác dụng gì?",
    "options": [
      "Để học viên tự học không cần đăng ký",
      "Tạo giá trị gia tăng, kích thích sự tò mò và mong muốn học tiếp",
      "Làm đầy bộ nhớ điện thoại của học viên",
      "Giảm bớt công việc tư vấn của Sale"
    ],
    "correctAnswer": 1,
    "explanation": "Quà tặng tài liệu là mồi câu tuyệt vời để duy trì sự hứng thú học tập của học viên."
  }
];

const topics = [
  {
    prefix: "Xử lý từ chối về giá",
    questions: [
      ["Khách hàng chê học phí cao, Sale nên phản hồi thế nào?", ["Đồng tình và giảm giá ngay lập tức", "Nhấn mạnh vào giá trị, chất lượng giảng dạy và cam kết đầu ra để so sánh", "Bảo khách đi tìm trung tâm khác rẻ hơn", "Không trả lời nữa"], 1, "Luôn tập trung vào giá trị mang lại (Value) thay vì chạy đua về giá (Price)."],
      ["Khi khách hàng nói 'Để chị suy nghĩ thêm vì hơi quá ngân sách', cách xử lý tốt nhất là?", ["Vâng, chị cứ suy nghĩ đi ạ", "Chia nhỏ học phí, tư vấn trả góp hoặc đưa ra ưu đãi giới hạn thời gian", "Hỏi thẳng khách có bao nhiêu tiền", "Tỏ thái độ khó chịu"], 1, "Chia nhỏ học phí (VD: trả góp) giúp giảm áp lực tài chính cho khách."],
      ["Khách hỏi 'Bên em có giảm giá thêm không?', Sale đáp:", ["Dạ không, bên em giá niêm yết rồi", "Dạ học phí bên em đã ưu đãi tốt nhất rồi, nhưng nếu anh/chị đăng ký hnay em tặng thêm bộ tài liệu độc quyền", "Dạ có, em bớt thêm 500k nhé", "Để em hỏi sếp đã"], 1, "Thay vì giảm giá trực tiếp làm giảm giá trị khóa học, hãy dùng quà tặng (Add-on) để chốt sale."],
      ["Nếu khách hàng so sánh giá với trung tâm A (rẻ hơn), Sale nên làm gì?", ["Nói xấu trung tâm A", "Phân tích sự khác biệt về sĩ số, chất lượng giáo viên và quyền lợi bảo lưu/học lại của Hi Korean", "Giảm giá để cạnh tranh với trung tâm A", "Im lặng"], 1, "Làm nổi bật USP (Unique Selling Proposition) của Hi Korean là cách tốt nhất để vượt qua so sánh giá."],
      ["Khách hàng báo 'Tháng này kẹt tiền quá, tháng sau đăng ký được không?', Sale xử lý:", ["Vâng tháng sau chị đăng ký nhé", "Dạ vâng, nhưng chị có thể cọc trước 500k để giữ ưu đãi của tháng này, tháng sau học phí có thể tăng ạ", "Vậy chị vay mượn thêm đi", "Không sao, bao giờ có tiền thì học"], 1, "Chốt cọc giữ chỗ là kỹ thuật rất quan trọng để tránh mất khách vào tháng sau."],
      ["Sale nên làm gì khi khách chê mức cọc 1 triệu là quá cao?", ["Hạ mức cọc xuống tùy tâm khách", "Giải thích rõ đây là quy định để giữ slot và mức ưu đãi cực lớn, tiền cọc sẽ được trừ thẳng vào học phí", "Hủy luôn không cho khách cọc nữa", "Bảo khách cọc 2 triệu"], 1, "Cần giải thích rõ quyền lợi gắn liền với số tiền cọc để khách yên tâm."],
      ["Khi tư vấn Combo dài hạn, khách sợ đóng một cục nhiều tiền, Sale có thể đề xuất gì?", ["Bảo khách đóng từng khóa một (không áp dụng ưu đãi combo)", "Đề xuất chính sách trả góp 0% qua thẻ tín dụng hoặc chia làm 2 đợt đóng", "Khuyên khách vay ngân hàng", "Ép khách phải đóng 1 cục"], 1, "Cung cấp giải pháp thanh toán linh hoạt giúp tăng tỷ lệ chốt các khóa giá trị cao (High-ticket)."],
      ["Tại sao không nên báo giá ngay khi khách vừa nhắn tin 'Học phí bao nhiêu'?", ["Vì sợ khách chê đắt chạy mất", "Vì cần phải tìm hiểu trình độ, mục tiêu và tư vấn lộ trình phù hợp trước để khách thấy được giá trị", "Vì quy định công ty cấm", "Vì Sale chưa nhớ giá"], 1, "Nguyên tắc Sale: Luôn tạo ra Giá Trị trước khi đưa ra Giá Cả."],
      ["Khách nói 'Giá rẻ nhỉ, chất lượng có đảm bảo không?', Sale cần trả lời:", ["Dạ tiền nào của nấy ạ", "Dạ mức giá này là do bên em đang có ưu đãi lớn tri ân học viên, chất lượng cam kết bằng văn bản hợp đồng ạ", "Dạ vâng chất lượng bình thường thôi ạ", "Anh/chị yên tâm đi, không sao đâu"], 1, "Phải dùng cam kết hợp đồng để đập tan sự nghi ngờ về chất lượng khi có giá rẻ."],
      ["Một trong những sai lầm lớn nhất khi khách chê đắt là gì?", ["Tiếp tục giải thích giá trị khóa học", "Ngay lập tức tụt năng lượng và cho rằng khách không có tiền thật", "Chuyển hướng sang tư vấn gói học bổng/trả góp", "Đồng cảm với khách"], 1, "Giữ vững năng lượng và niềm tin vào sản phẩm là yếu tố tiên quyết của một người Sale giỏi."]
    ]
  },
  {
    prefix: "Kỹ năng chốt sale",
    questions: [
      ["Đâu là tín hiệu mua hàng (Buying signal) từ khách hàng?", ["Khách seen không rep", "Khách hỏi 'Học phí này đã bao gồm giáo trình chưa em?'", "Khách bảo 'Trung tâm em xa quá'", "Khách chê logo trung tâm xấu"], 1, "Khi khách hỏi sâu về chi tiết quyền lợi (giáo trình, lịch học), đó là tín hiệu họ đã sẵn sàng mua."],
      ["Kỹ thuật 'Chốt giả định' (Assumptive Close) là như thế nào?", ["Hỏi khách 'Chị có mua không?'", "Hỏi khách 'Vậy chị chuyển khoản qua Vietcombank hay Techcombank để em làm hồ sơ ạ?'", "Giả định khách không mua và bỏ qua", "Bảo khách suy nghĩ thêm"], 1, "Đưa ra câu hỏi lựa chọn phương thức thanh toán thay vì câu hỏi Có/Không."],
      ["Khi khách hàng đã đồng ý học, việc tiếp theo Sale NÊN làm NGAY LẬP TỨC là gì?", ["Gửi mã QR/STK và hướng dẫn cú pháp chuyển khoản rõ ràng", "Tâm sự tiếp chuyện đời tư với khách", "Đi pha cốc cà phê rồi tí gửi STK sau", "Hỏi lại 'Chị chắc chắn học chứ?'"], 1, "Khi cảm xúc khách đang lên cao, phải đưa ra Call to Action (Gửi STK) ngay lập tức."],
      ["Khách bảo 'Để chị hỏi ý kiến chồng đã', Sale nên phản hồi thế nào để không bị mất khách?", ["Vâng chị hỏi đi ạ", "Dạ vâng, tiện thể em gửi chị bảng chi tiết lộ trình để chị đưa anh xem nhé. Khoảng tối mai em nhắn lại chị nha!", "Chồng chị chắc không cho đâu", "Chị tự quyết định đi chứ"], 1, "Cung cấp thêm tài liệu để khách dễ bề thuyết phục người nhà, đồng thời chốt lịch hẹn liên lạc lại."],
      ["Làm thế nào để tạo ra sự khẩn cấp (Urgency) mà không phản cảm?", ["'Nhanh lên chị, không là hết hạn đấy'", "'Dạ hiện lớp tối t2-4-6 chỉ còn đúng 2 slot nhận ưu đãi giảm 30%, chị chốt sớm để em giữ chỗ nhé'", "'Chị không đóng tiền là em bị sếp mắng'", "'Em xin chị đấy đăng ký đi'"], 1, "Đưa ra con số cụ thể (chỉ còn 2 slot) kèm theo lợi ích (ưu đãi 30%) tạo sự khẩn cấp rất tự nhiên."],
      ["Nếu gọi điện thoại chốt sale (Telesale), giọng điệu của Sale nên như thế nào?", ["Thều thào, nói nhỏ vì sợ phiền", "Tràn đầy năng lượng, tự tin, phát âm rõ ràng và mỉm cười khi nói", "Gắt gỏng, nói nhanh cho xong", "Giọng đều đều như đọc kịch bản"], 1, "Năng lượng của Sale sẽ truyền sang khách hàng. Mỉm cười khi nói giúp giọng điệu thân thiện hơn."],
      ["Khi khách hàng đang trong trạng thái 'Seen' quá 24h, Sale nên làm gì?", ["Bơ luôn khách", "Nhắn một tin nhắn follow-up thả thính: 'Dạ chị Yến ơi, hôm qua em có chừa lại 1 suất ưu đãi cho chị, không biết chị đã thu xếp được chưa ạ?'", "Nhắn dấu chấm '?'", "Chửi khách sao không rep"], 1, "Follow-up khéo léo bằng cách nhắc lại ưu đãi và thể hiện sự quan tâm đặc biệt (chừa lại suất)."],
      ["Sale có nên cam kết những thứ không có trong chính sách trung tâm để chốt khách không?", ["Có, chốt được là trên hết", "Tuyệt đối KHÔNG, chỉ cam kết những gì trung tâm có thể thực hiện được bằng văn bản", "Chỉ hứa miệng, không ghi vào hợp đồng", "Tùy tâm trạng"], 1, "Cam kết quá lố (Over-promise) sẽ dẫn đến khủng hoảng CSKH sau này. Chỉ bán sự thật."],
      ["Kỹ thuật 'Chốt đảo ngược' (Takeaway Close) thường áp dụng khi nào?", ["Khi khách vừa nhắn tin", "Khi khách quá nhây, đòi hỏi vô lý: 'Nếu chị không quyết định sớm, suất ưu đãi này em xin phép nhường cho bạn khác đang chờ ạ'", "Khi khách đã chuyển khoản", "Khi khách mới hỏi giá"], 1, "Lấy đi cơ hội của khách sẽ kích hoạt tâm lý 'Sợ bỏ lỡ' (FOMO) của họ."],
      ["Mục đích của việc gọi điện cho khách thay vì nhắn tin khi chốt sale là gì?", ["Đỡ mỏi tay gõ phím", "Truyền đạt cảm xúc tốt hơn, giải quyết thắc mắc ngay lập tức và đẩy cảm xúc khách hàng lên cao", "Để chửi khách dễ hơn", "Vì quy định trung tâm"], 1, "Giọng nói mang lại cảm xúc mạnh mẽ hơn văn bản, giúp phá băng và chốt sale tỷ lệ cao hơn."]
    ]
  },
  {
    prefix: "Xử lý từ chối về thời gian/lịch học",
    questions: [
      ["Khách bảo 'Chị bận quá chắc không theo lịch cố định được', Sale tư vấn sao?", ["Vậy chị nghỉ đi ạ", "Dạ bên em có các lớp linh hoạt, ngoài ra mọi buổi học đều được ghi hình (Record) để chị xem lại nếu lỡ bận ạ", "Chị bận thì thôi đừng học", "Cố gắng sắp xếp đi chị"], 1, "Record buổi học là một trong những 'vũ khí' tuyệt vời để chốt khách hàng bận rộn."],
      ["Khách muốn học 1-1 vì lịch quá lung tung, nhưng trung tâm chỉ mạnh lớp nhóm, Sale nên:", ["Từ chối luôn", "Tư vấn lớp nhóm nhưng cam kết hỗ trợ ngoài giờ 1-1 với trợ giảng, nhấn mạnh lớp nhóm có không khí thi đua học tốt hơn", "Bảo khách đi tìm gia sư", "Ép khách học lớp nhóm mà không giải thích"], 1, "Biến nhược điểm thành ưu điểm (lớp nhóm vui hơn, có tính cạnh tranh) và bổ sung add-on (trợ giảng kèm ngoài giờ)."],
      ["Khách hỏi 'Học 6 tháng có cam kết đỗ TOPIK 2 không?', Sale trả lời:", ["Chắc chắn 100% đỗ, nhắm mắt cũng đỗ", "Dạ trung tâm cam kết đầu ra bằng văn bản nếu chị tham gia đủ 80% buổi học và làm đủ bài tập ạ. Nếu không đỗ được học lại miễn phí!", "Hên xui chị ạ", "Không cam kết gì hết"], 1, "Cam kết đầu ra luôn đi kèm với điều kiện về sự nỗ lực của học viên (đi học, làm bài tập)."],
      ["Nếu trung tâm chưa có lịch khai giảng phù hợp ngay tuần này, Sale nên:", ["Bảo khách khi nào có lịch sẽ nhắn", "Chốt cọc giữ chỗ cho lịch khai giảng tuần sau/tháng sau, tặng trước tài liệu để khách tự ôn tập làm quen", "Im lặng", "Bảo khách sang trung tâm khác"], 1, "Luôn cố gắng chốt cọc để lock khách, không để khách bị nguội ý chí học tập."],
      ["Khách đang học giữa chừng báo 'Chị đi công tác 1 tháng, chị xin nghỉ', Sale xử lý:", ["Cho khách nghỉ luôn", "Hỗ trợ làm thủ tục BẢO LƯU cho khách để khách yên tâm công tác, cam kết xếp lớp phù hợp khi khách quay lại", "Bắt khách nộp tiền phạt", "Bảo khách cố mà vừa đi công tác vừa học"], 1, "Chính sách bảo lưu là quyền lợi chính đáng, Sale cần hỗ trợ nhiệt tình để giữ chân học viên."],
      ["'Em làm ca xoay liên tục, không học cố định tối được'. Giải pháp của Sale là:", ["Gợi ý học các lớp có cả ca sáng và tối để học viên học bù chéo, kết hợp xem lại video record", "Bảo khách nghỉ việc", "Từ chối nhận khách", "Gửi video cho khách tự học"], 1, "Sự linh hoạt trong việc học bù chéo các ca là điểm cộng lớn của trung tâm."],
      ["Học viên kêu 'Lịch học 3 buổi/tuần nhiều quá, chị sợ học không vào', Sale nói gì?", ["'Nhiều gì chị, người ta học 5 buổi kìa'", "'Dạ lịch 3 buổi là chuẩn khoa học để não bộ ghi nhớ tốt nhất, không bị ngợp mà cũng không bị quên. Em sẽ đồng hành nhắc nhở chị nhé!'", "'Thế chị học 1 buổi thôi'", "'Tại chương trình nó thế chị ạ'"], 1, "Dùng lý lẽ khoa học và sự cam kết đồng hành của Sale để trấn an học viên."],
      ["Khi khách hỏi về lịch học, Sale nên đưa ra:", ["10 lịch học để khách tự chọn", "2 phương án lịch học phù hợp nhất với khung giờ khách đã chia sẻ để khách dễ ra quyết định", "Không đưa ra lịch nào", "Chỉ đưa 1 lịch duy nhất"], 1, "Nghịch lý của sự lựa chọn: Đưa quá nhiều lựa chọn sẽ làm khách hàng bối rối. Hãy đưa 2 options."],
      ["Nếu lịch khách chọn bị full (đầy) học viên, Sale nên:", ["Xin lỗi và báo khách không học được", "Sử dụng nó làm 'hiệu ứng chim mồi': 'Dạ lịch đó bên em vừa full slot cuối, chị học sang lịch X nhé, em xin sếp giữ nguyên ưu đãi cho chị'", "Đuổi bớt học viên cũ ra", "Nhét thêm khách vào mặc kệ chất lượng"], 1, "Sự full lớp chứng tỏ trung tâm uy tín. Tận dụng điều đó để chốt lớp khác một cách tự nhiên."],
      ["Khách muốn học cấp tốc 1 tháng đỗ TOPIK 3 từ con số 0, Sale nên:", ["Nhận tiền và hứa hươu hứa vượn", "Phân tích thực tế lộ trình học ngôn ngữ cần thời gian tích lũy, tư vấn lộ trình thực tế 6-8 tháng để khách hiểu", "Chửi khách ảo tưởng", "Bảo khách tự học"], 1, "Tư vấn có tâm, đúng chuyên môn sẽ tạo sự tin tưởng tuyệt đối từ khách hàng."]
    ]
  },
  {
    prefix: "Kiến thức sản phẩm & USP",
    questions: [
      ["Điểm mạnh (USP) lớn nhất của khóa giao tiếp tại Hi Korean là gì?", ["Giáo trình photocopy", "100% học với giáo viên Hàn Quốc có chứng chỉ sư phạm, luyện phát âm chuẩn như người bản xứ", "Học phí rẻ nhất thị trường", "Không có bài tập về nhà"], 1, "Nhấn mạnh vào chất lượng giáo viên bản xứ là chìa khóa bán khóa giao tiếp."],
      ["Khóa học SC1 (Sơ cấp 1) phù hợp với đối tượng nào?", ["Người đã có TOPIK 2", "Người chưa từng học tiếng Hàn hoặc mất gốc hoàn toàn", "Người muốn luyện dịch thuật", "Giáo viên tiếng Hàn"], 1, "Xác định đúng chân dung khách hàng giúp tư vấn trúng đích."],
      ["Khách muốn xuất khẩu lao động sang Hàn, Sale nên định hướng khóa nào?", ["Khóa Giao tiếp chuyên sâu", "Khóa Sơ cấp (SC1, SC2) kết hợp luyện thi EPS-TOPIK", "Khóa Tiếng Hàn trẻ em", "Khóa Viết luận"], 1, "EPS-TOPIK là chứng chỉ bắt buộc cho người đi XKLĐ Hàn Quốc."],
      ["Tài liệu học tập tại Hi Korean có gì đặc biệt?", ["Dùng sách lậu trên mạng", "Giáo trình độc quyền được biên soạn bởi các chuyên gia ngôn ngữ, update liên tục theo format đề thi mới", "Chỉ dùng sách giáo khoa cũ", "Không có tài liệu, học chay"], 1, "Giáo trình độc quyền thể hiện sự đầu tư và chuyên môn cao của trung tâm."],
      ["Để lấy được chứng chỉ TOPIK II (Cấp 3-4), học viên thường cần thời gian bao lâu nếu học từ con số 0?", ["1 tháng", "Khoảng 6 - 9 tháng học tập trung và liên tục", "3 năm", "1 tuần"], 1, "Đưa ra lộ trình thời gian thực tế giúp học viên chuẩn bị tâm lý và tài chính."],
      ["Tại sao Sale cần phải thuộc lòng lộ trình học của trung tâm?", ["Để đối phó với bài kiểm tra", "Để tự tin vẽ ra con đường rõ ràng cho học viên, giúp họ thấy được đích đến và tin tưởng vào chuyên môn của Sale", "Để khoe với sếp", "Không cần thuộc"], 1, "Sale có chuyên môn là Sale chốt được nhiều đơn nhất."],
      ["Khi khách hỏi 'Bên em có tổ chức thi thử không?', Sale trả lời:", ["Không, thi thử tốn thời gian", "Có ạ, trung tâm tổ chức thi thử định kỳ hàng tháng mô phỏng 100% đề thi thật, giúp học viên làm quen áp lực phòng thi", "Có nhưng thu phí rất cao", "Học viên tự tải đề trên mạng mà thi"], 1, "Thi thử mô phỏng là một dịch vụ gia tăng cực kỳ ăn điểm trong mắt học viên."],
      ["'Giáo viên bên em kinh nghiệm như nào?'. Câu trả lời chuẩn xác nhất là:", ["Giáo viên trẻ lắm ạ", "100% giáo viên có bằng cử nhân/thạc sĩ Ngôn ngữ Hàn, đạt TOPIK 5/6 và có ít nhất 3 năm kinh nghiệm thực chiến", "Giáo viên là sinh viên năm nhất", "Em cũng không rõ lắm"], 1, "Profile giáo viên là thứ khách hàng mua niềm tin. Phải show ra những con số ấn tượng nhất."],
      ["Sự khác biệt giữa TOPIK I và TOPIK II là gì?", ["Chỉ khác nhau cái tên", "TOPIK I (cấp 1-2) là sơ cấp (nghe, đọc). TOPIK II (cấp 3-6) là trung-cao cấp, có thêm phần thi Viết cực kỳ khó.", "TOPIK I thi nói, TOPIK II thi viết", "TOPIK II dễ hơn TOPIK I"], 1, "Hiểu cấu trúc bài thi giúp Sale tư vấn chính xác khóa Luyện thi TOPIK II."],
      ["Nếu khách đang phân vân giữa việc tự học qua Youtube và đi học trung tâm, Sale dùng 'vũ khí' gì?", ["Chê bai những người tự học", "Nhấn mạnh sự 'Kỷ luật', 'Môi trường tương tác sửa lỗi trực tiếp' và 'Lộ trình tối ưu rút ngắn thời gian' của trung tâm", "Cứ để khách tự học", "Nói Youtube toàn dạy sai"], 1, "Môi trường và sự sửa lỗi trực tiếp là thứ mà Youtube không bao giờ có được."]
    ]
  },
  {
    prefix: "Chăm sóc khách hàng & Upsell",
    questions: [
      ["Khi học viên SC1 nghỉ học 2 buổi liên tiếp, bộ phận Sale/CSKH nên làm gì?", ["Mặc kệ, đóng tiền rồi thì thôi", "Chủ động nhắn tin/gọi điện hỏi thăm sức khỏe, lý do nghỉ và gửi video record + bài tập để học viên không bị tụt lại", "Nhắn tin mắng học viên", "Báo giáo viên đuổi học"], 1, "Sự theo sát thể hiện tinh thần trách nhiệm, giúp học viên không bị chán nản rồi bỏ cuộc."],
      ["Thời điểm TỐT NHẤT để tư vấn Upsell (Bán khóa tiếp theo - SC2) là khi nào?", ["Vừa mới đóng tiền SC1 xong", "Vào buổi học cuối cùng của khóa SC1", "Khi khóa học SC1 đã đi được 70-80% chặng đường và học viên đang có kết quả tốt", "Sau khi học viên đã nghỉ học 3 tháng"], 1, "Giai đoạn 70-80% khóa là lúc học viên đã thấy được kết quả và có trust (niềm tin) cao nhất."],
      ["Để Upsell thành công, Sale cần dựa vào yếu tố nào của học viên?", ["Quê quán của học viên", "Sự tiến bộ, điểm số bài test gần nhất và mục tiêu dài hạn của học viên", "Sở thích âm nhạc của học viên", "Tâm trạng của Sale hôm đó"], 1, "Dùng chính kết quả của học viên để làm đòn bẩy thuyết phục họ học lên cao hơn."],
      ["'Referral' (Khách giới thiệu khách) là nguồn doanh thu thụ động tuyệt vời. Làm sao để có nó?", ["Ép khách hàng phải giới thiệu", "Chăm sóc học viên cũ cực tốt, kết hợp chính sách tặng Voucher/Tiền mặt cho người giới thiệu thành công", "Đăng bài trên Facebook cá nhân", "Không cần làm gì, khách tự giới thiệu"], 1, "Chăm sóc khách hàng xuất sắc sinh ra khách hàng mới với chi phí marketing bằng 0."],
      ["Khi học viên phàn nàn về chất lượng giáo viên, hành động ĐẦU TIÊN của Sale là gì?", ["Cãi lại bảo vệ giáo viên", "Xin lỗi vì trải nghiệm chưa tốt, lắng nghe chi tiết vấn đề và hứa sẽ báo cáo quản lý/đổi giáo viên nếu cần", "Chặn tin nhắn học viên", "Hoàn tiền ngay lập tức"], 1, "Lắng nghe và xoa dịu cảm xúc của khách là bước đầu tiên trong xử lý khủng hoảng."],
      ["Học viên cũ đã dừng học 6 tháng, Sale có nên nhắn tin lại không?", ["Không, họ quên mình rồi", "Có, nhân dịp Lễ/Tết hoặc có chương trình ưu đãi đặc biệt (Re-marketing) gửi tin nhắn hỏi thăm và tặng Voucher", "Có, nhắn tin đòi nợ", "Có, gửi tin nhắn rác mỗi ngày"], 1, "Re-marketing khách hàng cũ tốn ít chi phí hơn nhiều so với tìm kiếm khách hàng mới."],
      ["Khi chúc mừng sinh nhật học viên, Sale nên gửi gì kèm theo?", ["Chỉ lời chúc suông", "Một tấm thiệp thiết kế đẹp kèm mã Giảm giá đặc biệt (sinh nhật) áp dụng cho khóa học hoặc tặng người thân", "Một cái video hài", "Bảng giá gốc"], 1, "Kết hợp chúc mừng và tặng ưu đãi cá nhân hóa giúp tăng tỷ lệ chuyển đổi vô cùng tự nhiên."],
      ["Trong quá trình học viên ôn thi TOPIK, Sale có thể hỗ trợ gì?", ["Không làm gì, đó là việc của giáo viên", "Gửi thêm tài liệu sưu tầm, đề thi các năm trước và nhắn tin động viên trước ngày thi", "Thi hộ học viên", "Bảo học viên tự lo"], 1, "Sự đồng hành của Sale ngoài giờ học tạo ra sự gắn kết sâu sắc (Loyalty) với thương hiệu."],
      ["Thái độ đúng đắn của Sale khi học viên cũ báo 'chưa có nhu cầu học tiếp' là?", ["Hủy kết bạn", "Vui vẻ chấp nhận, dặn dò học viên giữ gìn kiến thức và khẳng định trung tâm luôn mở cửa đón họ quay lại", "Ép học viên nói lý do", "Khóc lóc van xin"], 1, "Để lại một cánh cửa mở. Rất nhiều khách hàng sẽ quay lại sau vài tháng nếu họ có ấn tượng tốt."],
      ["Cách tốt nhất để theo dõi tiến độ của hàng trăm học viên đang học là gì?", ["Nhớ trong đầu", "Sử dụng file Excel hoặc hệ thống CRM (LMS) để ghi chú chi tiết lịch sử chăm sóc, điểm số và tính cách từng người", "Ghi ra giấy nhớ dán khắp bàn", "Hỏi lại giáo viên mỗi ngày"], 1, "Làm việc có hệ thống (CRM/LMS) là kỹ năng bắt buộc của một Sale/CSKH chuyên nghiệp."]
    ]
  },
  {
    prefix: "Xử lý tình huống khó",
    questions: [
      ["Khách hàng nhắn tin lúc 11h đêm hỏi khóa học, Sale (nếu đang thức) nên:", ["Đọc xong để mai rep", "Rep luôn nhiệt tình: 'Dạ chào chị, muộn thế này chị vẫn chăm chỉ tìm hiểu khóa học ạ, em hỗ trợ chị nhé!'", "Nhắn tin chửi khách vì làm phiền", "Cài tin nhắn tự động cụt lủn"], 1, "Sự nhiệt tình ngoài giờ hành chính thường gây ấn tượng cực mạnh và tỷ lệ chốt sale rất cao."],
      ["Khách báo 'Em ơi trung tâm khác vừa gọi báo giảm 50%, bên em giảm bằng họ đi chị học'", ["Giảm luôn 50% theo", "Khẳng định 'Giá trị đi đôi với chất lượng', giải thích việc giảm giá 50% thường đi kèm cắt giảm chất lượng giáo viên/dịch vụ", "Bảo khách sang bên kia học luôn đi", "Tắt máy"], 1, "Không bao giờ chạy đua khô máu về giá. Hãy dùng bài toán Giá Trị để phản biện."],
      ["Học viên SC1 đòi đổi giáo viên vì 'thầy dạy nhanh quá chị không theo kịp', Sale xử lý:", ["Đổi ngay lập tức không cần hỏi", "Trấn an học viên, trao đổi lại với giáo viên để điều chỉnh tốc độ, nếu sau 2 buổi vẫn không ổn mới tiến hành đổi lớp", "Bảo học viên tự cố gắng đi", "Mắng giáo viên"], 1, "Làm cầu nối giữa học viên và giáo viên để giải quyết tận gốc vấn đề trước khi dùng giải pháp đổi lớp."],
      ["Phụ huynh gọi điện phàn nàn 'Sao con tôi học 2 tháng rồi chưa biết nói tiếng Hàn?'", ["Đổ lỗi cho đứa trẻ lười học", "Mời phụ huynh xem lại bảng điểm, nhật ký học tập, phân tích lộ trình ngôn ngữ cần thời gian tích lũy từ vựng trước khi bật âm", "Hoàn lại tiền cho xong chuyện", "Cãi tay đôi với phụ huynh"], 1, "Dùng data (dữ liệu điểm số, chuyên cần) và chuyên môn sư phạm để giải thích một cách thuyết phục và chuyên nghiệp."],
      ["Khách đã đóng cọc nhưng 1 tuần sau nhắn 'Chị có việc gia đình đột xuất, cho chị xin lại tiền cọc'", ["Trả luôn không do dự", "Theo chính sách cọc không hoàn lại, nhưng Sale linh động hỗ trợ BẢO LƯU số tiền cọc đó trong 6 tháng để khách giải quyết việc gia đình rồi đi học lại", "Chửi khách lừa đảo", "Chặn số"], 1, "Vừa tuân thủ luật chơi (không hoàn cọc), vừa thấu tình đạt lý (bảo lưu cọc dài hạn) giúp vẹn cả đôi đường."],
      ["Khách chê 'Cơ sở vật chất bên em hơi cũ nhỉ'", ["Vâng bên em nghèo lắm", "Dạ bù lại bên em dồn toàn bộ ngân sách vào việc mời Giảng viên xịn nhất và chất lượng giáo trình, đó mới là cốt lõi của việc học ạ", "Cũ nhưng vẫn học được mà chị", "Chị chê thì đi chỗ khác"], 1, "Kỹ thuật 'Đánh lạc hướng sang điểm mạnh cốt lõi' (Focus on Core Value)."],
      ["Sale gọi điện cho Data (khách để lại SĐT) nhưng khách bắt máy gắt: 'Đang bận, gọi gì giờ này!'", ["Cúp máy ngay lập tức", "Dạ em xin lỗi chị, em thấy chị để lại thông tin quan tâm khóa tiếng Hàn, vậy 8h tối nay em gọi lại hỗ trợ chị nhé. Chúc chị buổi chiều vui vẻ!", "Chửi lại khách", "Cố gắng nói nhanh kịch bản trong 10 giây"], 1, "Xin lỗi lịch sự, chốt giờ gọi lại và chúc tốt lành thể hiện EQ cực cao của người làm Sale."],
      ["Khách hỏi một câu chuyên môn tiếng Hàn cực khó mà Sale KHÔNG BIẾT, Sale nên:", ["Lên Google tìm đại một câu trả lời sai", "Dạ câu hỏi này rất hay, thuộc kiến thức chuyên sâu. Em xin phép note lại chuyển cho Thầy/Cô trưởng bộ môn giải đáp chi tiết và phản hồi chị ngay ạ!", "Bơ luôn câu hỏi", "Nói 'Em là Sale em không biết'"], 1, "Sự thật thà kết hợp với việc nhờ chuyên gia hỗ trợ vừa giữ uy tín, vừa thể hiện quy trình làm việc chuyên nghiệp."],
      ["Khách so sánh: 'Trung tâm kia cam kết bằng văn bản có mộc đỏ, bên em có không?'", ["Bên em không có", "Dạ có chứ ạ! Trung tâm em ký Hợp đồng đào tạo pháp lý đàng hoàng, có mộc đỏ công ty cam kết đầu ra rõ ràng cho chị luôn!", "Bên em chỉ hứa miệng thôi", "Mộc đỏ làm gì chị ơi"], 1, "Tính pháp lý (Mộc đỏ, Hợp đồng) là 'liều thuốc an thần' mạnh nhất để chốt các khóa học giá trị lớn."],
      ["Kỹ năng quan trọng nhất để làm nghề Sale/Tư vấn giáo dục bền vững là gì?", ["Chỉ biết giảm giá", "Nói dối trơn tru", "Lắng nghe chân thành, thấu hiểu nhu cầu và luôn đặt lợi ích học tập của học viên lên hàng đầu", "Ép khách bằng mọi giá"], 1, "Sale giáo dục là bán Tương lai. Chỉ có sự Chân thành và Giá trị thật mới tạo ra sự nghiệp bền vững."]
    ]
  }
];

let currentId = 11;
let allQuestions = [...original10];

topics.forEach((topic, tIndex) => {
  topic.questions.forEach((qArr, qIndex) => {
    allQuestions.push({
      id: currentId++,
      question: qArr[0],
      options: qArr[1],
      correctAnswer: qArr[2],
      explanation: qArr[3],
      category: topic.prefix
    });
  });
});

fs.writeFileSync('src/data/quizData.json', JSON.stringify(allQuestions, null, 2));
console.log('Successfully generated ' + allQuestions.length + ' distinct questions!');
