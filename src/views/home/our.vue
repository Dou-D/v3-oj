<template>
  <a-flex justify="center" align="center" vertical>
    <a-typography class="w-9/12">
      <a-typography-title>OnlineJudge指南</a-typography-title>
      <a-typography-paragraph >
        OnlineJudge平台是一种面向程序设计竞赛和算法训练的在线评测系统。它提供了一种便捷的方式让用户提交代码并获取实时的评测结果，帮助用户提升编程技能和算法水平。用户可以在平台上参加各种编程挑战和比赛，与其他程序员进行竞争，还可以通过解决各种算法问题来提升自己的编程能力。
      </a-typography-paragraph>
      <a-typography-paragraph strong>
        随着技术的发展和编程社区的需求变化，我们计划逐步支持更多编程语言，包括TypeScript、C++、Java、Python和Go。这将使我们的系统更加全面，能够满足更广泛用户的需求。
      </a-typography-paragraph>
      <a-card title="我们的技术">
        <a-card-grid style="width: 33.3%; text-align: center" v-for="item in Data1" :key="item.id">
          <a-card-meta
            :title="item.title"
            :description="item.content"
          />
        </a-card-grid>
      </a-card>
      <a-card title="优势">
        <a-card-grid style="width: 33.3%; text-align: center" v-for="item in Data3" :key="item.id">
          <a-card-meta
            :title="item.title"
            :description="item.content"
          />
        </a-card-grid>
      </a-card>
      <a-card title="未来">
        <a-card-grid style="width: 33.3%; text-align: center" v-for="item in Data2" :key="item.id">
          <a-card-meta
            :title="item.title"
            :description="item.content"
          />
        </a-card-grid>
      </a-card>
      
      <a-typography-title :level="2">即将到来的功能</a-typography-title>
      <a-typography-paragraph>
        为了不断提高用户体验和平台的教育价值，我们正在开发以下功能：
        <a-list item-layout="horizontal" :data-source="data" :bordered="false">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #description>{{ item.description }}</template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-typography-paragraph>
      <a-typography-paragraph>
        我们致力于创建一个支持多种编程语言和多样化挑战的环境，以促进学习和成长。期待您在我们平台上实现编程技能的飞跃。
      </a-typography-paragraph>
    </a-typography>
  </a-flex>
</template>

<script setup>

const blockContent = `在这里，每一次代码提交都是向更高技能的迈进。无论是刚开始学习编程的新手，还是有经验的开发者，我们的平台都将提供必要的工具和资源，帮助您在编程道路上不断前行。`;
const editable = {
  autoSize: {
    minRows: 2,
    maxRows: 6,
  },
  maxLength: 1,
  editing: false,
};
const data = [
  {
    description: "增加对多种编程语言的支持，以适应不同用户的需求。",
  },
  {
    description:
      "引入更多的编程挑战和难度级别，以适应从初学者到高级开发者的所有水平。",
  },
  {
    description:
      "提供实时反馈和详细的代码分析，帮助用户理解他们的错误并改进他们的编码技巧。",
  },
];

const Data1 = [
  {
    id: 1,
    title: "前端技术栈",
    content: "Vue3、Vue-Router4、Ant Design、Pinia、Monaco-Editor、Axios、Element+",
  },
  {
    id: 2,
    title: "后端技术栈",
    content: "gin，grom-mysql，jwt，redis，zap-logger，viper",
  },
  {
    id: 3,
    title: "运维技术栈",
    content: "Docker、Nginx",
  }
]

const Data2 = [
  {
    id: 1,
    title: "市场规模",
    content: "随着计算机科学的普及和编程教育的重视，OJ平台市场规模不断扩大。越来越多的学生、程序员和编程爱好者加入到OJ平台，参与编程挑战和算法训练。",
  },
  {
    id: 2,
    title: "用户群体",
    content: "OJ平台的主要用户群体包括学生、程序员、算法工程师、技术招聘者等。学生可以通过OJ平台提升编程技能，程序员和算法工程师可以在平台上刷题提高自己的算法水平，技术招聘者可以通过OJ平台评估候选人的编程能力。",
  },
  {
    id: 3,
    title: "发展趋势",
    content: "随着人工智能、大数据、云计算等领域的快速发展，对编程能力和算法水平的需求不断增加，OJ平台将成为一个重要的学习和评估工具。未来，OJ平台可能会进一步扩大题库覆盖范围，提供更多的在线编程挑战和算法竞赛，同时加强社区建设和用户体验，以吸引更多用户",
  }
]
const Data3 = [
  {
    id: 1,
    title: "实时测评",
    content: " OJ平台能够实时评测用户提交的代码，并给出准确的运行结果和错误提示，帮助用户及时发现和解决问题",
  },
  {
    id: 2,
    title: "开放性",
    content: "OJ平台通常是开放式的系统，用户可以自由注册、提交代码、查看题目等，方便用户参与和使用",
  },
  {
    id: 3,
    title: "可拓展性",
    content: "随着OJ平台用户的增加可以拓展其他业务，如建立社区，教学辅助，招聘评测等业务。",
  }
]
</script>
