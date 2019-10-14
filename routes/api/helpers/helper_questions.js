const Question = require("../../../model/Questions");

module.exports = {
  getQuestions: function(req, res) {
    Question.find({}).then(questions => {
      if (questions.length) {
        return res.json({ message: "All Question", questions });
      } else {
        return res.json({ message: "No Question for You", data: null });
      }
    });
  },
  postQuestions: function(req, res) {
    // if (!req.user.admin) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // } else {

    Question.findOne().then(questions => {
      if (questions !== null) {
        if (Array.isArray(req.body)) {
          req.body.map(data => {
            questions.questions.push({
              question: data.question,
              type: data.type,
              question_option: [
                {
                  option_value: "Yes",
                  weight: 1
                },
                {
                  option_value: "I Can't tell",
                  weight: 0
                },
                {
                  option_value: "No",
                  weight: -1
                }
              ]
            });
          });
        } else {
          questions.questions.push({
            question: req.body.question,
            type: req.body.type,
            question_option: [
              {
                option_value: "Yes",
                weight: 1
              },
              {
                option_value: "I Can't tell",
                weight: 0
              },
              {
                option_value: "No",
                weight: -1
              }
            ]
          });
        }
        questions.save().then(data => {
          res.json(data);
        });
      } else {
        const newQuestion = new Question();
        newQuestion.questions = req.body;
        newQuestion
          .save()
          .then(data =>
            res.json({ message: "Questions Added Successfully", data })
          )
          .catch(err => res.json(err));
      }
    });
    // }
  },
  expert: function(req, res) {
    const dog = req.body.dog;
    const snake = req.body.snake;
    const scorpion = req.body.scorpion;
    scorpion.steps = [
      {
        step: "Wash the sting with soap and water."
      },
      {
        step:
          "Apply cool compresses, usually 10 minutes on and ten minutes off of the site of the sting."
      },
      {
        step:
          "Acetaminophen (Tylenol) 1-2 tablets every 4 hours may be given to relieve pain (usually not to exceed 3g per 24 hours)."
      },
      {
        step:
          "Antibiotics are not helpful unless the sting area become secondarily infectedDo not cut into the wound or apply suction."
      },
      {
        step:
          "If a child is 5 years or younger is stung, seek evaluation by a medical caregiver."
      }
    ];
    scorpion.prevention = [
      {
        prevention:
          "Remove piles of rocks or lumber from around your house and don't store firewood against the house or inside."
      },
      {
        prevention:
          "Keep grass closely mowed, and prune bushes and overhanging tree branches, which can provide a path to your roof for scorpions."
      },
      {
        prevention:
          "Caulk cracks, install weatherstripping around doors and windows, and repair torn screens."
      },
      {
        prevention:
          "Inspect and shake out gardening gloves, boots and clothing that haven't been used for a while."
      },
      {
        prevention:
          "When traveling in areas where lethal scorpions are common — especially if you're camping or staying in rustic accommodations — wear shoes and shake out your clothing, bedding, gear and packages often."
      }
    ];
    const spider = req.body.spider;
    spider.steps = [
      {
        step: "Clean the wound with soap and water."
      },
      {
        step: "Dab it with antibiotic cream."
      },
      { step: "Elevate (raise) the area that was bitten to reduce swelling." },
      { step: "Put an ice pack on the bite." },
      { step: "Take over-the-counter pain medicine, if needed." },
      { step: "Watch for more severe symptoms." }
    ];
    spider.prevention = [
      {
        prevention: "Wear long-sleeved shirts, hats and gloves."
      },
      {
        prevention: "Tuck your pants into your socks."
      },
      {
        prevention:
          "Shake out garden gloves and other clothing before putting them on."
      },
      {
        prevention: "Store gardening clothes in a tightly sealed plastic bag."
      },
      {
        prevention:
          "Move piles of firewood and stones away from your home, and use caution around them."
      }
    ];
    const sortNumbers = (a, b) => {
      return a.weight - b.weight;
    };
    const array = [dog, snake, spider, scorpion];
    const advice = array.sort(sortNumbers);
    res.json(advice[advice.length - 1]);
  }
};
