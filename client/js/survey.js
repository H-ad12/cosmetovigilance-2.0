// ============================================================
//  QUESTION DEFINITIONS (identical to original)
// ============================================================
export const questions = [
  {
    id: 'q1',
    type: 'radio',
    arabic: 'كم مرة تستخدم مستحضرات التجميل أو العناية بالبشرة (بما في ذلك الكريمات، الغسولات، منتجات الشعر، العطور)؟',
    english: 'How frequently do you use cosmetic or skincare products (including creams, cleansers, hair products, perfumes)?',
    options: [
      { ar: 'يومياً', en: 'Daily' },
      { ar: 'عدة مرات في الأسبوع', en: 'Several times a week' },
      { ar: 'نادراً / في المناسبات', en: 'Rarely / Only on occasions' }
    ]
  },
  {
    id: 'q2',
    type: 'checkbox',
    arabic: 'ما هي طبيعة أو فئة مستحضرات التجميل التي تستخدمها بشكل متكرر؟ (يمكنك اختيار أكثر من إجابة)',
    english: 'What is the nature/category of the cosmetic products you use most frequently? (Select all that apply)',
    options: [
      { ar: 'علامات طبية / جلدية', en: 'Medicated / Dermaceutical brands' },
      { ar: 'علامات تجارية / صيدليات', en: 'Commercial / Drugstore brands' },
      { ar: 'منتجات محلية / يدوية / غير مسجلة', en: 'Local / Handmade / Unbranded products' },
      { ar: 'تركيبات عشبية / طبيعية تقليدية', en: 'Herbal / Natural traditional formulations' }
    ]
  },
  {
    id: 'q3',
    type: 'radio',
    arabic: 'من أين تشتري مستحضرات التجميل والعناية بشكل أساسي؟',
    english: 'Where do you primarily purchase your cosmetic products?',
    options: [
      { ar: 'الصيدليات', en: 'Pharmacies' },
      { ar: 'متاجر التجميل المتخصصة أو المولات', en: 'Specialized cosmetic stores or malls' },
      { ar: 'مواقع التسوق الإلكتروني أو وسائل التواصل', en: 'Online shopping pages or social media' },
      { ar: 'الأسواق المحلية أو السوبرماركت', en: 'Local supermarkets or local markets' }
    ]
  },
  {
    id: 'q4',
    type: 'radio',
    arabic: 'ما القيمة التقريبية لإنفاقك على مستحضرات التجميل والعناية شهرياً؟',
    english: 'Approximately how much do you spend on cosmetic/skincare products per month?',
    options: [
      { ar: 'أقل من ١٥,٠٠٠ دينار', en: 'Under 15,000 IQD' },
      { ar: '١٥,٠٠٠ إلى ٥٠,٠٠٠ دينار', en: '15,000 to 50,000 IQD' },
      { ar: '٥١,٠٠٠ إلى ١٠٠,٠٠٠ دينار', en: '51,000 to 100,000 IQD' },
      { ar: 'أكثر من ١٠٠,٠٠٠ دينار', en: 'More than 100,000 IQD' }
    ]
  },
  {
    id: 'q5',
    type: 'radio',
    arabic: 'هل تتحقق من تاريخ انتهاء الصلاحية، مدة الاستخدام بعد الفتح، أو المكونات قبل شراء المنتج؟',
    english: 'Do you check the expiration date, shelf life, or ingredients before buying a product?',
    options: [
      { ar: 'نعم', en: 'Yes' },
      { ar: 'لا', en: 'No' },
      { ar: 'أحياناً', en: 'Sometimes' }
    ]
  },
  {
    id: 'q6',
    type: 'radio',
    arabic: 'هل عانيت سابقاً من أي أثر جانبي أو تأثير غير مرغوب فيه بعد استخدام مستحضر تجميلي؟',
    english: 'Have you ever experienced an undesirable or adverse effect after using a cosmetic product?',
    options: [
      { ar: 'نعم', en: 'Yes' },
      { ar: 'لا', en: 'No' }
    ],
    skipIf: (val) => val === 'لا'
  },
  {
    id: 'q7',
    type: 'checkbox',
    arabic: 'ما نوع العرض الجانبي الذي تعرضت له؟ (يمكنك اختيار أكثر من إجابة)',
    english: 'What type of adverse reaction did you experience? (Select all that apply)',
    options: [
      { ar: 'احمرار الجلد، طفح جلدي، أو تورم', en: 'Skin Redness, Rash, or Swelling' },
      { ar: 'حكة شديدة أو إحساس بالحرقان', en: 'Severe Itching or Burning sensation' },
      { ar: 'ظهور مفاجئ لحب الشباب', en: 'Sudden Acne breakouts' },
      { ar: 'تساقط الشعر، مشاكل فروة الرأس، أو تقصف', en: 'Hair thinning, Scalp issues, or Hair fall' },
      { ar: 'أخرى', en: 'Other' }
    ]
  },
  {
    id: 'q8',
    type: 'checkbox',
    arabic: 'إذا كان العرض الجانبي بسبب منتج للعناية بالبشرة، ما نوعه بالتحديد؟ (يمكنك اختيار أكثر من إجابة)',
    english: 'If the reaction was caused by a skincare product, what specific type was it?',
    options: [
      { ar: 'غسول أو مقشر للوجه', en: 'Facial Cleanser or Scrub' },
      { ar: 'مرطب أو كريم', en: 'Moisturizer or Cream' },
      { ar: 'سيروم أو تونر للوجه', en: 'Facial Serum or Toner' },
      { ar: 'واقي شمس', en: 'Sunscreen' },
      { ar: 'كريم تبييض أو إزالة البقع', en: 'Skin Lightening or Bleaching Cream' },
      { ar: 'غير قابل للتطبيق', en: 'Not Applicable' }
    ]
  },
  {
    id: 'q9',
    type: 'checkbox',
    arabic: 'إذا كان العرض الجانبي بسبب منتج للشعر، ما نوعه بالتحديد؟ (يمكنك اختيار أكثر من إجابة)',
    english: 'If the reaction was caused by a hair product, what specific type was it?',
    options: [
      { ar: 'شامبو أو بلسم', en: 'Shampoo or Conditioner' },
      { ar: 'صبغة شعر أو مبيض', en: 'Hair Dye or Bleach' },
      { ar: 'زيت شعر أو سيروم', en: 'Hair Oil or Serum' },
      { ar: 'مادة كيميائية لفرد الشعر أو كيراتين', en: 'Chemical Straightener or Keratin Treatment' },
      { ar: 'غير قابل للتطبيق', en: 'Not Applicable' }
    ]
  },
  {
    id: 'q10',
    type: 'radio',
    arabic: 'كيف تصف شدة أهم عرض جانبي تعرضت له؟',
    english: 'How would you describe the severity of the most significant reaction you experienced?',
    options: [
      { ar: 'خفيف', en: 'Mild' },
      { ar: 'متوسط', en: 'Moderate' },
      { ar: 'شديد', en: 'Severe' }
    ]
  },
  {
    id: 'q11',
    type: 'radio',
    arabic: 'ما الإجراء الذي اتخذته بعد ظهور هذا العرض الجانبي؟',
    english: 'What action did you take after experiencing this reaction?',
    options: [
      { ar: 'توقفت عن استخدام المنتج فوراً', en: 'Discontinued using the product immediately' },
      { ar: 'استمررت في استخدامه على أمل أن يختفي', en: 'Kept using it hoping it would clear up' },
      { ar: 'استشرت طبيباً أو صيدلانياً', en: 'Consulted a doctor, dermatologist, or pharmacist' },
      { ar: 'استخدمت علاجاً منزلياً أو نصيحة صديق', en: 'Used a home remedy or a friend\'s advice' }
    ]
  }
];

// ============================================================
//  SURVEY STATE
// ============================================================
export let currentQuestionIndex = 0;
export let isSurveyComplete = false;
export const surveyAnswers = {};

export function resetSurveyState() {
  currentQuestionIndex = 0;
  isSurveyComplete = false;
  Object.keys(surveyAnswers).forEach((key) => delete surveyAnswers[key]);
}

// ============================================================
//  DOM refs (will be set by app.js)
// ============================================================
export let questionContainer = null;
export let surveyProgress = null;
export let surveyStepLabel = null;
export let surveyStepEn = null;
export let surveyBackBtn = null;
export let surveyNextBtn = null;
export let reviewContainer = null;

export function setSurveyDomRefs(refs) {
  questionContainer = refs.questionContainer;
  surveyProgress = refs.surveyProgress;
  surveyStepLabel = refs.surveyStepLabel;
  surveyStepEn = refs.surveyStepEn;
  surveyBackBtn = refs.surveyBackBtn;
  surveyNextBtn = refs.surveyNextBtn;
  reviewContainer = refs.reviewContainer;
}

// ============================================================
//  RENDER QUESTION
// ============================================================
export function renderQuestion(goToPageFn, renderReviewFn) {
  if (isSurveyComplete) {
    renderReviewFn();
    goToPageFn('page-review');
    return;
  }

  if (currentQuestionIndex >= questions.length) {
    isSurveyComplete = true;
    renderReviewFn();
    goToPageFn('page-review');
    return;
  }

  const q = questions[currentQuestionIndex];
  const total = questions.length;
  const progress = ((currentQuestionIndex) / total) * 100;
  surveyProgress.style.width = progress + '%';
  surveyStepLabel.textContent = `السؤال ${currentQuestionIndex + 1} من ${total}`;
  surveyStepEn.textContent = `Question ${currentQuestionIndex + 1} of ${total}`;

  surveyBackBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-flex';

  let html = `
    <div class="question-block">
      <p class="title-en">${q.english}</p>
      <h3 class="title-ar">${q.arabic}</h3>
      <div class="options-group" id="optionsGroup">
  `;

  const saved = surveyAnswers[q.id] || [];

  q.options.forEach((opt) => {
    const value = opt.ar;
    const isSelected = saved.includes(value);
    const inputType = q.type === 'radio' ? 'radio' : 'checkbox';
    const nameAttr = q.type === 'radio' ? `q_${q.id}` : `q_${q.id}_${Math.random()}`;
    const isCheckbox = q.type === 'checkbox';

    html += `
      <label class="option-item ${isSelected ? 'selected' : ''}" data-value="${value}">
        <input type="${inputType}" name="${nameAttr}" value="${value}" ${isSelected ? 'checked' : ''} />
        <span class="custom-control ${isCheckbox ? 'checkbox' : ''}"></span>
        <span class="option-text">
          <span class="option-en">${opt.en}</span>
          <span class="option-ar">${opt.ar}</span>
        </span>
      </label>
    `;
  });

  html += `</div></div>`;
  questionContainer.innerHTML = html;

  // Attach handlers
  document.querySelectorAll('.option-item input').forEach(input => {
    input.addEventListener('change', function() {
      const parent = this.closest('.option-item');
      const group = parent.closest('.options-group');
      if (this.type === 'radio') {
        group.querySelectorAll('.option-item').forEach(el => {
          el.classList.remove('selected');
        });
        parent.classList.add('selected');
        surveyAnswers[q.id] = [this.value];
      } else {
        if (this.checked) {
          parent.classList.add('selected');
        } else {
          parent.classList.remove('selected');
        }
        const checked = [];
        group.querySelectorAll('.option-item input:checked').forEach(checkedInput => {
          checked.push(checkedInput.value);
        });
        surveyAnswers[q.id] = checked;
      }
    });
  });

  if (q.type === 'radio' && saved.length > 0) {
    const val = saved[0];
    document.querySelectorAll('.option-item').forEach(el => {
      if (el.dataset.value === val) {
        el.classList.add('selected');
        el.querySelector('input').checked = true;
      }
    });
  }

  surveyNextBtn.innerHTML = currentQuestionIndex === questions.length - 1 ?
    'مراجعة الإجابات <span class="inline-english">Review</span>' :
    'التالي → <span class="inline-english">Next</span>';
}

// ============================================================
//  CONDITIONAL SKIP
// ============================================================
// ============================================================
//  SURVEY NAVIGATION
// ============================================================
export function surveyNext(goToPageFn, renderReviewFn) {
  const q = questions[currentQuestionIndex];
  if (!q) return;
  const saved = surveyAnswers[q.id] || [];
  if (saved.length === 0) {
    alert('الرجاء اختيار إجابة قبل المتابعة. / Please select an answer before proceeding.');
    return;
  }
  if (q.id === 'q6') {
    const val = saved[0];
    if (q.skipIf && q.skipIf(val)) {
      currentQuestionIndex = questions.length;
      isSurveyComplete = true;
      renderReviewFn();
      goToPageFn('page-review');
      return;
    }
  }
  currentQuestionIndex++;
  renderQuestion(goToPageFn, renderReviewFn);
}

export function surveyBack(goToPageFn, renderReviewFn) {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion(goToPageFn, renderReviewFn);
  }
}

// ============================================================
//  REVIEW
// ============================================================
export function renderReview() {
  const p = window._participantData || { fullName: '', studyYear: '', gender: '', age: '' };
  const answers = surveyAnswers;
  let html = `
    <div class="review-section">
      <div class="section-title">👤 معلومات المشارك / Participant Info</div>
      <div class="review-item"><span class="label">الاسم الكامل</span><span class="value">${p.fullName}</span></div>
      <div class="review-item"><span class="label">السنة الدراسية</span><span class="value">${p.studyYear}</span></div>
      <div class="review-item"><span class="label">الجنس</span><span class="value">${p.gender}</span></div>
      <div class="review-item"><span class="label">العمر</span><span class="value">${p.age}</span></div>
    </div>
    <div class="review-section"><div class="section-title">📋 إجابات الاستبيان / Survey Answers</div>`;

  questions.forEach(q => {
    const ans = answers[q.id] || [];
    const display = ans.length > 0 ? ans.join('، ') : '—';
    const enDisplay = ans.map(a => {
      const found = q.options.find(o => o.ar === a);
      return found ? found.en : a;
    }).join(', ');
    html += `
      <div class="review-item">
        <span class="label">${q.arabic}</span>
        <span class="value">${display} <span class="value-en">${enDisplay}</span></span>
      </div>`;
  });
  html += `</div>`;
  reviewContainer.innerHTML = html;
}