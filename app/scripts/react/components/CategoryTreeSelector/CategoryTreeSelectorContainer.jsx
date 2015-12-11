import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import CategoryTreeSelector from './CategoryTreeSelector';

class CategoryTreeSelectorContainer extends Component {
  constructor(props) {
    super(props);
    this.acceptSelection = this.acceptSelection.bind(this);
    this.changeCategories = this.changeCategories.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
    this.discardSelection = this.discardSelection.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }
  state = {
    categories: this.props.data,
    modalUuid: uuid.v4(),
    selectedCategories: this.props.categories_ids,
    selectedUncommitted: this.props.categories_ids,
  }
  acceptSelection() {
    this.setState({ selectedCategories: this.state.selectedUncommitted });
  }
  changeCategories(categories) {
    this.setState({ categories });
  }
  changeSelection(selected) {
    this.setState({ selectedUncommitted: selected });
  }
  discardSelection() {
    this.setState({ selectedUncommitted: this.state.selectedCategories });
  }
  removeCategory(categoryId) {
    const newCategories = this.state.selectedCategories.filter(
      (id) => id !== categoryId
    );

    this.setState({
      selectedCategories: newCategories,
      selectedUncommitted: newCategories,
    });
  }
  render() {
    return (
      <CategoryTreeSelector
        {...this.props}
        {...this.state}
        onCategoriesChange={this.changeCategories}
        onCategoryRemove={this.removeCategory}
        onSelectionAccept={this.acceptSelection}
        onSelectionChange={this.changeSelection}
        onSelectionDiscard={this.discardSelection}
      />
    );
  }
}

CategoryTreeSelectorContainer.propTypes = {
  categories_ids: PropTypes.array.isRequired,
  canCreate: PropTypes.bool,
  createButtonTitle: PropTypes.string,
  data: PropTypes.array.isRequired,
  fieldName: PropTypes.string.isRequired,
  modalCreateTitle: PropTypes.string,
  modalShowTitle: PropTypes.string,
};
CategoryTreeSelectorContainer.defaultProps = {
  "fieldName": "product[categories_ids][]",
  "data": [
    {
      "id": 560,
      "text": "Hello!asdsadd22",
      "children": [
        {
          "id": 3373,
          "text": "Новая категорияыв",
          "children": []
        },
        {
          "id": 3390,
          "text": "Новая категория",
          "children": []
        },
        {
          "id": 3229,
          "text": "New node",
          "children": []
        },
        {
          "id": 3232,
          "text": "New node",
          "children": []
        },
        {
          "id": 3372,
          "text": "Новая категориявв=)",
          "children": []
        },
        {
          "id": 3402,
          "text": "Новая категорияdddd",
          "children": []
        },
        {
          "id": 3400,
          "text": "Новая категорияdd",
          "children": []
        },
        {
          "id": 3427,
          "text": "Приветики!",
          "children": [
            {
              "id": 3428,
              "text": "Нода",
              "children": []
            }
          ]
        },
        {
          "id": 3429,
          "text": "хелло!",
          "children": []
        },
        {
          "id": 3243,
          "text": "New node",
          "children": []
        },
        {
          "id": 3416,
          "text": "test",
          "children": []
        },
        {
          "id": 3417,
          "text": "test2",
          "children": []
        },
        {
          "id": 3251,
          "text": "New node",
          "children": []
        },
        {
          "id": 3269,
          "text": "New node",
          "children": []
        },
        {
          "id": 3198,
          "text": "New node",
          "children": []
        },
        {
          "id": 3219,
          "text": "New node",
          "children": [
            {
              "id": 3304,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3228,
          "text": "New node",
          "children": []
        },
        {
          "id": 3197,
          "text": "New node",
          "children": []
        },
        {
          "id": 3233,
          "text": "New node",
          "children": [
            {
              "id": 3305,
              "text": "Привет как дела? Как погода Азаза",
              "children": []
            }
          ]
        },
        {
          "id": 3236,
          "text": "New node",
          "children": []
        },
        {
          "id": 3220,
          "text": "New node",
          "children": []
        },
        {
          "id": 3214,
          "text": "New node",
          "children": []
        },
        {
          "id": 3328,
          "text": "фвфывф",
          "children": []
        },
        {
          "id": 3271,
          "text": "New node",
          "children": []
        },
        {
          "id": 3225,
          "text": "New node",
          "children": []
        },
        {
          "id": 3194,
          "text": "фывфв",
          "children": [
            {
              "id": 3341,
              "text": "вв",
              "children": []
            }
          ]
        },
        {
          "id": 3206,
          "text": "New node",
          "children": []
        },
        {
          "id": 3215,
          "text": "New node",
          "children": [
            {
              "id": 3307,
              "text": "New node",
              "children": []
            },
            {
              "id": 3308,
              "text": "фывфывфыв",
              "children": []
            }
          ]
        },
        {
          "id": 3490,
          "text": "фв",
          "children": []
        },
        {
          "id": 3237,
          "text": "New node",
          "children": []
        },
        {
          "id": 3257,
          "text": "New node",
          "children": []
        },
        {
          "id": 3187,
          "text": "New node",
          "children": []
        },
        {
          "id": 3423,
          "text": "Руру",
          "children": []
        },
        {
          "id": 3169,
          "text": "Алое",
          "children": []
        },
        {
          "id": 3439,
          "text": "asdasd",
          "children": []
        },
        {
          "id": 3244,
          "text": "New node",
          "children": []
        },
        {
          "id": 3246,
          "text": "New node",
          "children": []
        },
        {
          "id": 3278,
          "text": "New node",
          "children": []
        },
        {
          "id": 3394,
          "text": "Новая категорияdd",
          "children": []
        },
        {
          "id": 3395,
          "text": "ddd",
          "children": []
        },
        {
          "id": 3163,
          "text": "New node",
          "children": []
        },
        {
          "id": 3189,
          "text": "New node",
          "children": []
        },
        {
          "id": 3149,
          "text": "New node",
          "children": [
            {
              "id": 3424,
              "text": "фывфыв",
              "children": []
            },
            {
              "id": 3153,
              "text": "New node",
              "children": [
                {
                  "id": 3488,
                  "text": "Ок",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": 3299,
          "text": "New node",
          "children": []
        },
        {
          "id": 3148,
          "text": "New node",
          "children": [
            {
              "id": 3154,
              "text": "New node",
              "children": []
            },
            {
              "id": 3150,
              "text": "New node",
              "children": [
                {
                  "id": 3151,
                  "text": "New node",
                  "children": [
                    {
                      "id": 3152,
                      "text": "New node",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": 3262,
          "text": "New node",
          "children": []
        },
        {
          "id": 3267,
          "text": "New node",
          "children": []
        },
        {
          "id": 3173,
          "text": "New node",
          "children": []
        },
        {
          "id": 3332,
          "text": "New node",
          "children": []
        },
        {
          "id": 3281,
          "text": "New node",
          "children": []
        },
        {
          "id": 3230,
          "text": "New node",
          "children": [
            {
              "id": 3311,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3363,
          "text": "ввфывфыв",
          "children": [
            {
              "id": 3366,
              "text": "фыв",
              "children": []
            }
          ]
        },
        {
          "id": 3399,
          "text": "New noded",
          "children": [
            {
              "id": 3487,
              "text": "Ку-ку",
              "children": []
            },
            {
              "id": 3425,
              "text": "Привет!",
              "children": []
            },
            {
              "id": 3426,
              "text": "тест",
              "children": []
            },
            {
              "id": 3485,
              "text": "test",
              "children": []
            },
            {
              "id": 3421,
              "text": "Ку-ку",
              "children": []
            },
            {
              "id": 3422,
              "text": "Ку-ку",
              "children": []
            },
            {
              "id": 3486,
              "text": "test",
              "children": []
            },
            {
              "id": 3438,
              "text": "еуые",
              "children": []
            },
            {
              "id": 3484,
              "text": "test",
              "children": []
            }
          ]
        },
        {
          "id": 3465,
          "text": "asddasdd",
          "children": []
        },
        {
          "id": 3190,
          "text": "New node",
          "children": []
        },
        {
          "id": 3143,
          "text": "New node",
          "children": []
        },
        {
          "id": 3354,
          "text": "New node",
          "children": []
        },
        {
          "id": 3247,
          "text": "New node",
          "children": []
        },
        {
          "id": 4279,
          "text": "test",
          "children": [
            {
              "id": 4280,
              "text": "hello",
              "children": []
            }
          ]
        },
        {
          "id": 3436,
          "text": "Hello!",
          "children": [
            {
              "id": 4278,
              "text": "вв",
              "children": []
            },
            {
              "id": 3437,
              "text": "Как дела?",
              "children": [
                {
                  "id": 4277,
                  "text": "норм",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": 3256,
          "text": "New node",
          "children": [
            {
              "id": 3314,
              "text": "New node",
              "children": []
            },
            {
              "id": 3312,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3185,
          "text": "New node",
          "children": []
        },
        {
          "id": 3351,
          "text": "New node",
          "children": []
        },
        {
          "id": 3352,
          "text": "New node",
          "children": []
        },
        {
          "id": 3364,
          "text": "Новая каввввтегория",
          "children": []
        },
        {
          "id": 3393,
          "text": "Новая категорияdd",
          "children": []
        },
        {
          "id": 3295,
          "text": "New node",
          "children": []
        },
        {
          "id": 3453,
          "text": "asdasdasdsadadasd",
          "children": [
            {
              "id": 3454,
              "text": "Test",
              "children": []
            }
          ]
        },
        {
          "id": 3333,
          "text": "фывфыв",
          "children": []
        },
        {
          "id": 3489,
          "text": "й",
          "children": []
        },
        {
          "id": 3273,
          "text": "New node",
          "children": []
        },
        {
          "id": 3433,
          "text": "Ха-ха!",
          "children": []
        },
        {
          "id": 3357,
          "text": "=):D",
          "children": []
        },
        {
          "id": 3222,
          "text": "New node",
          "children": []
        },
        {
          "id": 3191,
          "text": "New node",
          "children": []
        },
        {
          "id": 3193,
          "text": "New node",
          "children": []
        },
        {
          "id": 3210,
          "text": "New node",
          "children": []
        },
        {
          "id": 3192,
          "text": "New node",
          "children": []
        },
        {
          "id": 3202,
          "text": "New node",
          "children": []
        },
        {
          "id": 3203,
          "text": "New node",
          "children": []
        },
        {
          "id": 3241,
          "text": "New node",
          "children": []
        },
        {
          "id": 3242,
          "text": "New node",
          "children": []
        },
        {
          "id": 3234,
          "text": "New node",
          "children": []
        },
        {
          "id": 3221,
          "text": "New node",
          "children": []
        },
        {
          "id": 3172,
          "text": "New node",
          "children": []
        },
        {
          "id": 3183,
          "text": "New node",
          "children": []
        },
        {
          "id": 3238,
          "text": "New node",
          "children": []
        },
        {
          "id": 3401,
          "text": "Новая категорияddd",
          "children": []
        },
        {
          "id": 3195,
          "text": "New node",
          "children": []
        },
        {
          "id": 3260,
          "text": "New node",
          "children": []
        },
        {
          "id": 3188,
          "text": "New node",
          "children": []
        },
        {
          "id": 3224,
          "text": "New node",
          "children": []
        },
        {
          "id": 3226,
          "text": "New node",
          "children": []
        },
        {
          "id": 3389,
          "text": "Новая категория",
          "children": []
        },
        {
          "id": 3392,
          "text": "Новая категория:D",
          "children": []
        },
        {
          "id": 3179,
          "text": "New node",
          "children": []
        },
        {
          "id": 3467,
          "text": "фыв",
          "children": [
            {
              "id": 3468,
              "text": "в",
              "children": []
            }
          ]
        },
        {
          "id": 3180,
          "text": "New node",
          "children": []
        },
        {
          "id": 3205,
          "text": "New node",
          "children": []
        },
        {
          "id": 3265,
          "text": "New node",
          "children": []
        },
        {
          "id": 3201,
          "text": "New node",
          "children": []
        },
        {
          "id": 3344,
          "text": "dddd",
          "children": [
            {
              "id": 3349,
              "text": "ddd",
              "children": []
            },
            {
              "id": 3348,
              "text": "asdad",
              "children": []
            }
          ]
        },
        {
          "id": 3261,
          "text": "New node",
          "children": []
        },
        {
          "id": 3449,
          "text": "d",
          "children": []
        },
        {
          "id": 3182,
          "text": "New node",
          "children": []
        },
        {
          "id": 3456,
          "text": "ok",
          "children": []
        },
        {
          "id": 3170,
          "text": "Ку-ку22",
          "children": []
        },
        {
          "id": 3406,
          "text": "d:)",
          "children": []
        },
        {
          "id": 3231,
          "text": "New node",
          "children": []
        },
        {
          "id": 3283,
          "text": "New node",
          "children": []
        },
        {
          "id": 3335,
          "text": "фывфывф",
          "children": [
            {
              "id": 3339,
              "text": "New node",
              "children": []
            },
            {
              "id": 3338,
              "text": "фывфывыфв",
              "children": []
            }
          ]
        },
        {
          "id": 3404,
          "text": "Новая категория:D",
          "children": []
        },
        {
          "id": 3418,
          "text": "test3",
          "children": [
            {
              "id": 3419,
              "text": "Q-q",
              "children": []
            }
          ]
        },
        {
          "id": 3430,
          "text": "Тест",
          "children": [
            {
              "id": 3432,
              "text": "Как дела?",
              "children": []
            },
            {
              "id": 3431,
              "text": "Привет!",
              "children": []
            }
          ]
        },
        {
          "id": 3263,
          "text": "New node",
          "children": []
        },
        {
          "id": 3358,
          "text": "asdasdasd",
          "children": []
        },
        {
          "id": 3270,
          "text": "New node",
          "children": []
        },
        {
          "id": 3396,
          "text": "d",
          "children": []
        },
        {
          "id": 3397,
          "text": "Новая категорияd",
          "children": []
        },
        {
          "id": 3398,
          "text": "Новая категория",
          "children": []
        },
        {
          "id": 3272,
          "text": "фывфыв",
          "children": [
            {
              "id": 3316,
              "text": "New nodeфыв",
              "children": []
            }
          ]
        },
        {
          "id": 3248,
          "text": "ыфвфывфыв",
          "children": [
            {
              "id": 3313,
              "text": "New node",
              "children": []
            },
            {
              "id": 3347,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3175,
          "text": "New node",
          "children": []
        },
        {
          "id": 3239,
          "text": "New node",
          "children": []
        },
        {
          "id": 3285,
          "text": "New node",
          "children": []
        },
        {
          "id": 3440,
          "text": "asdasd",
          "children": []
        },
        {
          "id": 3442,
          "text": "test",
          "children": []
        },
        {
          "id": 3463,
          "text": "test",
          "children": []
        },
        {
          "id": 3181,
          "text": "test",
          "children": [
            {
              "id": 3199,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3216,
          "text": "New node",
          "children": []
        },
        {
          "id": 3350,
          "text": "New node",
          "children": []
        },
        {
          "id": 3355,
          "text": "asdasdasd",
          "children": []
        },
        {
          "id": 3359,
          "text": "New node",
          "children": []
        },
        {
          "id": 3360,
          "text": "New node",
          "children": []
        },
        {
          "id": 3156,
          "text": "New node",
          "children": [
            {
              "id": 3160,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3223,
          "text": "New node",
          "children": []
        },
        {
          "id": 3405,
          "text": ":D:DD",
          "children": []
        },
        {
          "id": 3268,
          "text": "Привет!",
          "children": []
        },
        {
          "id": 3450,
          "text": "asdasd",
          "children": []
        },
        {
          "id": 3491,
          "text": "вфыв",
          "children": []
        },
        {
          "id": 3458,
          "text": "ok",
          "children": []
        },
        {
          "id": 3240,
          "text": "New node",
          "children": []
        },
        {
          "id": 3264,
          "text": "New node",
          "children": []
        },
        {
          "id": 3391,
          "text": "Новая категория:)",
          "children": []
        },
        {
          "id": 3208,
          "text": "New node",
          "children": []
        },
        {
          "id": 3211,
          "text": "New node",
          "children": []
        },
        {
          "id": 3155,
          "text": "New node",
          "children": [
            {
              "id": 3157,
              "text": "New node",
              "children": []
            },
            {
              "id": 3158,
              "text": "New node",
              "children": [
                {
                  "id": 3161,
                  "text": "New node",
                  "children": []
                },
                {
                  "id": 3159,
                  "text": "New node",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": 3370,
          "text": "Новая категория",
          "children": []
        },
        {
          "id": 3371,
          "text": "Новая категория",
          "children": []
        },
        {
          "id": 3164,
          "text": "New node",
          "children": []
        },
        {
          "id": 3167,
          "text": "New node",
          "children": []
        },
        {
          "id": 3266,
          "text": "New node",
          "children": []
        },
        {
          "id": 3279,
          "text": "New node",
          "children": []
        },
        {
          "id": 3317,
          "text": "New node",
          "children": []
        },
        {
          "id": 3443,
          "text": "Hello!",
          "children": []
        },
        {
          "id": 3444,
          "text": "Hell",
          "children": []
        },
        {
          "id": 3445,
          "text": "test",
          "children": []
        },
        {
          "id": 3451,
          "text": "asdasdasdasdasdasd",
          "children": []
        },
        {
          "id": 3452,
          "text": "test",
          "children": []
        },
        {
          "id": 3455,
          "text": "test",
          "children": []
        },
        {
          "id": 3457,
          "text": "test",
          "children": []
        },
        {
          "id": 3460,
          "text": "addd",
          "children": [
            {
              "id": 3461,
              "text": "Test",
              "children": []
            }
          ]
        },
        {
          "id": 3462,
          "text": "test",
          "children": []
        },
        {
          "id": 3466,
          "text": "Украшения",
          "children": []
        },
        {
          "id": 3331,
          "text": "New node",
          "children": []
        },
        {
          "id": 3403,
          "text": "Hello!:D",
          "children": []
        },
        {
          "id": 3204,
          "text": "Моя директория",
          "children": [
            {
              "id": 3343,
              "text": "New nodeasdas",
              "children": []
            },
            {
              "id": 3321,
              "text": "фывфывввввв",
              "children": []
            },
            {
              "id": 3297,
              "text": "New node",
              "children": []
            },
            {
              "id": 3315,
              "text": "New node",
              "children": []
            },
            {
              "id": 3296,
              "text": "Поддиректория",
              "children": []
            },
            {
              "id": 3302,
              "text": "New node",
              "children": []
            },
            {
              "id": 3320,
              "text": "фывфывы",
              "children": []
            },
            {
              "id": 3294,
              "text": "New nodeddd",
              "children": []
            },
            {
              "id": 3319,
              "text": "фывфыв",
              "children": []
            },
            {
              "id": 3342,
              "text": "вввв=)",
              "children": []
            },
            {
              "id": 3301,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3207,
          "text": "New node",
          "children": []
        },
        {
          "id": 3277,
          "text": "New node",
          "children": []
        },
        {
          "id": 3322,
          "text": "New node",
          "children": [
            {
              "id": 3325,
              "text": "New node",
              "children": []
            },
            {
              "id": 3324,
              "text": "New node",
              "children": []
            }
          ]
        },
        {
          "id": 3361,
          "text": "Хелло",
          "children": [
            {
              "id": 3362,
              "text": "ку-ку",
              "children": []
            }
          ]
        },
        {
          "id": 3196,
          "text": "New node",
          "children": []
        },
        {
          "id": 3209,
          "text": "New node",
          "children": []
        },
        {
          "id": 3213,
          "text": "New node",
          "children": []
        },
        {
          "id": 3274,
          "text": "New node",
          "children": []
        },
        {
          "id": 3218,
          "text": "New node",
          "children": []
        },
        {
          "id": 3186,
          "text": "New node",
          "children": []
        },
        {
          "id": 3217,
          "text": "New node",
          "children": []
        },
        {
          "id": 3227,
          "text": "New node",
          "children": []
        },
        {
          "id": 3245,
          "text": "New node",
          "children": []
        },
        {
          "id": 3276,
          "text": "New node",
          "children": []
        },
        {
          "id": 3329,
          "text": "фывфывфвфыв",
          "children": []
        },
        {
          "id": 3420,
          "text": "Привет!",
          "children": []
        },
        {
          "id": 3184,
          "text": "New node",
          "children": []
        },
        {
          "id": 3235,
          "text": "New node",
          "children": []
        },
        {
          "id": 3249,
          "text": "New node",
          "children": []
        },
        {
          "id": 3326,
          "text": "New node",
          "children": []
        },
        {
          "id": 3441,
          "text": "asdd",
          "children": []
        },
        {
          "id": 3286,
          "text": "New node",
          "children": []
        },
        {
          "id": 3298,
          "text": "Моя поддиректория",
          "children": [
            {
              "id": 3300,
              "text": "Ку-ку!",
              "children": []
            }
          ]
        },
        {
          "id": 3353,
          "text": "New node",
          "children": []
        },
        {
          "id": 3212,
          "text": "New node",
          "children": []
        },
        {
          "id": 3356,
          "text": "ddddd",
          "children": []
        }
      ]
    }
  ],
  "canCreate": true,
  "canRename": true,
  "canDelete": true,
  "categories_ids": [
    3466
  ],
  "createButtonTitle": "Создать",
  "modalCreateTitle": "Создание категории",
  "modalShowTitle": "Выбор категорий"
};

export default CategoryTreeSelectorContainer;