# Python 常用第三方库

## 📦 Web 框架

### Django
官方链接：https://www.djangoproject.com/

"电池内置"全功能框架，自带 ORM、Admin 后台、Auth 认证、CMS 系统。适合快速开发企业级应用，学习曲线较陡但功能全面。国内电商、内容平台广泛使用。

GitHub: [48k+ stars](https://github.com/django/django)

### FastAPI
官方链接：https://fastapi.tiangolo.com/

现代异步 API 框架，基于 Pydantic。自动文档生成（OpenAPI/Swagger）、类型安全、性能接近 Go/Node.js。新项目首选，适合微服务和 AI 服务部署。

GitHub: [157k+ stars](https://github.com/tiangolo/fastapi)

### Flask
官方链接：https://palletsprojects.com/p/flask/

微型框架，灵活轻量。核心简单，通过扩展实现各种功能。适合小项目、微服务、学习 Python Web 开发。

GitHub: [23k+ stars](https://github.com/pallets/flask)

### Sanic
官方链接：https://sanic.io/

高速异步 Web 框架，基于 asyncio。性能优秀，接近 Node.js Express。语法类似 Flask，适合高性能需求场景。

GitHub: [19k+ stars](https://github.com/sanic-org/sanic)

## 🗄️ 数据库与 ORM

### SQLAlchemy
官方链接：https://www.sqlalchemy.org/

最流行的 ORM，支持同步/异步双模式。ORM + Core 两种抽象层，事务管理完善，支持多种数据库。学习曲线中等。

GitHub: [6k+ stars](https://github.com/sqlalchemy/sqlalchemy)

### Django ORM
官方链接：https://docs.djangoproject.com/en/stable/topics/db/

Django 内置 ORM，强大易用。查询链式调用，支持聚合、注解、Prefetch。与 Django 集成完美，适合 Fullstack 项目。

### Peewee
官方链接：http://playhouse.peewee.io/

轻量级 ORM，语法简洁类似 Django。适合小型项目，对资源占用友好，文档清晰。

## 🧪 测试工具

### Pytest
官方链接：https://pytest.org/

最流行的测试框架，插件丰富。Fixture 系统强大，参数化测试、异步测试支持好。比 unittest 更简洁易学。

GitHub: [16k+ stars](https://github.com/pytest-dev/pytest)

### Faker
官方链接：https://faker.readthedocs.io/

伪造数据生成器，可生成姓名、地址、邮箱等真实数据。适合单元测试填充数据，避免硬编码测试用例。

GitHub: [42k+ stars](https://github.com/joke2k/faker)

### responses
官方链接：https://github.com/getsentry/responses

HTTP 请求 Mock 工具，拦截真实网络请求。用于隔离外部依赖的单元测试，提升测试速度。

GitHub: [7k+ stars](https://github.com/getsentry/responses)

## 🔧 数据处理与分析

### Pandas
官方链接：https://pandas.pydata.org/

数据分析处理核心库，DataFrame 操作。支持 Excel/CSV/SQL读取、数据清洗、统计分析。数据科学必备。

GitHub: [40k+ stars](https://github.com/pandas-dev/pandas)

### NumPy
官方链接：https://numpy.org/

数值计算基础库，N 维数组对象。矩阵运算、线性代数、傅里叶变换。几乎所有 Python 科学计算库的基础。

GitHub: [45k+ stars](https://github.com/numpy/numpy)

### Requests
官方链接：https://docs.python-requests.org/

HTTP 客户端必备库，优雅简洁的 API。支持 Session 持久连接、Cookie 管理、文件上传。Python HTTP 事实标准。

GitHub: [52k+ stars](https://github.com/psf/requests)

## 🤖 AI 与机器学习

### Scikit-learn
官方链接：https://scikit-learn.org/

传统机器学习库，分类/回归/聚类算法。API 一致，文档详尽。适合入门和工业级 ML 项目。

GitHub: [54k+ stars](https://github.com/scikit-learn/scikit-learn)

### PyTorch
官方链接：https://pytorch.org/

Facebook 深度学习框架，动态图设计。学术研究首选，社区活跃，模型 zoo 丰富。支持 GPU 加速。

GitHub: [121k+ stars](https://github.com/pytorch/pytorch)

### TensorFlow
官方链接：https://www.tensorflow.org/

Google 深度学习框架，静态图设计。生产环境部署成熟，TF Serving/Keras 完善。适合大规模分布式训练。

GitHub: [55k+ stars](https://github.com/tensorflow/tensorflow)

### HuggingFace transformers
官方链接：https://huggingface.co/docs/transformers

NLP 预训练模型库，支持 BERT/GPT/T5 等 100k+ 模型。一行代码加载预训练模型，LLM 时代必备。

GitHub: [126k+ stars](https://github.com/huggingface/transformers)

### LangChain
官方链接：https://python.langchain.com/

LLM 应用开发框架，支持 RAG、Agent、Prompt 模板。配合 OpenAI/Anthropic 等大模型，快速构建 AI 应用。

GitHub: [68k+ stars](https://github.com/langchain-ai/langchain)

---

*注：部分经典库已过时，请参考现代替代方案*
