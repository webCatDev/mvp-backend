class QueryBuilder {
  constructor(model) {
    this.model = model;
    this.query = {};
  }

  search(searchParams) {
    if (searchParams.q) {
      const conditions = searchParams.q.split(",");
      this.query.$or = conditions.map((condition) => {
        const splittedCondition = condition.split(":");
        const [field] = splittedCondition;
        if (splittedCondition[1] && splittedCondition[1].includes("$regex")) {
          const regexString = splittedCondition[2];
          return { [field]: new RegExp(regexString, "i") };
        } else {
          const regexString = splittedCondition[1];
          return { [field]: new RegExp(regexString, "i") };
        }
      });
    }
    return this;
  }

  filter(filterParams) {
    Object.keys(filterParams).forEach((param) => {
      const { gte, gt, lt, lte, exact } = filterParams[param];
      if (exact) {
        this.query[param] = exact;
      } else {
        const filterObj = {};
        if (gte) {
          filterObj.$gte = gte;
        }
        if (gt) {
          filterObj.$gt = gt;
        }
        if (lt) {
          filterObj.$lt = lt;
        }
        if (lte) {
          filterObj.$lte = lte;
        }
        this.query[param] = Object.keys(filterObj).length
          ? filterObj
          : filterParams[param];
      }
    });
    return this;
  }

  sort(sortParams) {
    if (sortParams) {
      const sortArray = sortParams.split(",");
      const sortObj = {};
      sortArray.forEach((param) => {
        const [field, order] = param.split(":");
        sortObj[field] = order === "desc" ? -1 : 1;
      });
      this.query.$sort = sortObj;
    }
    return this;
  }

  paginate(paginationParams) {
    const page = parseInt(paginationParams.page) || 1;
    const limit = parseInt(paginationParams.limit) || 10;
    const skip = (page - 1) * limit;
    this.query.$skip = skip;
    this.query.$limit = limit;
    return this;
  }

  async execute(options) {
    let  result
    if(options?.populate) {
      result = await this.model.find(this.query).populate(options.populate);
    } else {
      result = await this.model.find(this.query);

    }
    const count = await this.model.countDocuments(this.query);
    const totalPages = Math.ceil(count / this.query.$limit);
    const currentPage = Math.ceil(this.query.$skip / this.query.$limit) + 1;
    return {
      data: result,
      pagination: {
        totalRecords: count,
        totalPages,
        currentPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    };
  }
}

module.exports = QueryBuilder;
