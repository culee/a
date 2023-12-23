function countQuestionsByLevel(data) {
    // Khởi tạo biến đếm cho mỗi level
    let easyCount = 0;
    let difficultCount = 0;
    let mediumCount = 0;
  
    // Lặp qua mảng data để đếm số câu hỏi của từng level
    data.forEach((item) => {
      item.questions.forEach((question) => {
        switch (question.level.trim().toLowerCase()) {
          case 'easy':
            easyCount++;
            break;
          case 'difficult':
            difficultCount++;
            break;
          case 'medium':
            mediumCount++;
            break;
          default:
            // Nếu level không thuộc "Easy", "Difficult", hoặc "Medium", có thể xử lý thêm nếu cần
            break;
        }
      });
    });
  
    // Trả về một đối tượng chứa số câu hỏi của từng level
    return {
      easy: easyCount,
      difficult: difficultCount,
      medium: mediumCount,
    };
  }
  
  // Sử dụng hàm và in ra kết quả
  const questionCounts = countQuestionsByLevel(a);
  
  console.log('Easy:', questionCounts.easy);
  console.log('Difficult:', questionCounts.difficult);
  console.log('Medium:', questionCounts.medium);
  