<template>
  <MainWrapperVue>
    <template #header>
      <el-row :gutter="20" align="middle" justify="start">
        <el-col :span="8">
          <span>搜索内容：</span>
          <el-input v-model="content" placeholder="输入标题内容"></el-input>
        </el-col>
        <el-col :span="8">
          <span>审核状态：</span>
          <el-select v-model="status">
            <el-option v-for="item in options"> </el-option>
          </el-select>
        </el-col>
      </el-row>
    </template>
    <template #center>
      <div class="c-t-wrapper">
        <el-table :data="tableData" style="width: 100%" highlight-current-row>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            min-width="9%"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            min-width="20%"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="authorName"
            label="作者"
            align="center"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            prop="labels"
            label="标签"
            align="center"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            prop="createdTime"
            label="发布时间"
            align="center"
            min-width="11%"
          >
            <template #default="scope">
              {{ formatTime(scope.row.createdTime) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="reason"
            label="状态"
            min-width="14%"
            align="center"
          >
            <template #default="scope">
              {{ scope.row.reason || "提交（待审核）" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20%" align="center">
            <template #default="scope">
              <div style="display: flex; justify-content: space-evenly">
                <el-link :href="`/news/detail?id=${scope.row.id}`" type="primary" :underline="false"
                  >查看</el-link
                >
                <el-link
                  href="javscript:;"
                  type="success"
                  :underline="false"
                  disabled
                  >通过</el-link
                >
                <el-link
                  href="javscript:;"
                  type="danger"
                  :underline="false"
                  disabled
                  >驳回</el-link
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template #footer>
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "@/components/general/MainWrapper.vue";
import { ref, onBeforeMount } from "vue";
import formatTime from "@/utils/formatTime.js";
let content = ref();
let status = ref();
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
const options = ref([]);
let tableData = ref([]);
const handleSizeChange = (val) => {
}
const handleCurrentChange = (val) => {
}
onBeforeMount(() => {
  tableData.value = [
    {
      id: 6468,
      userId: 1102,
      title: "文章发布体验1",
      content:
        '[{"type":"text","value":"焊接速度加快v\\n"},{"type":"image","value":"http://heima-fastdfs.itheima.net/group1/M00/00/03/wKgCIWDoHVmAfA3NAATzoW3WmPA.02cf5e"}]',
      type: 1,
      channelId: 1,
      labels: "后即可",
      createdTime: "2022-11-05T07:32:31.000+0000",
      submitedTime: "2022-11-05T07:32:31.000+0000",
      status: 9,
      publishTime: "2022-11-05T07:32:27.000+0000",
      reason: "已发布",
      articleId: 1588802042283974700,
      images: "group1/M00/00/03/wKgCIWDoHVmAfA3NAATzoW3WmPA.02cf5e",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6466,
      userId: 1102,
      title: "吴小鸡传奇人生路",
      content:
        '[{"type":"image","value":"http://heima-fastdfs.itheima.net/group1/M00/00/03/wKgCIWDoHVCAG8cOAAIejjC5Rqw.9461bd"},{"type":"text","value":"随州精神小伙一枚,在线求偶"}]',
      type: 1,
      channelId: 1,
      labels: "求怕累",
      createdTime: "2022-11-05T04:56:16.000+0000",
      submitedTime: "2022-11-05T04:56:16.000+0000",
      status: 1,
      publishTime: "2022-11-05T04:00:00.000+0000",
      reason: null,
      articleId: null,
      images: "group1/M00/00/03/wKgCIWDoHU6ABk6aAACyrcxdN7s.ca9d04",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6465,
      userId: 1102,
      title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
      content:
        '[{"type":"text","value":"（观察者网讯）联合国人权理事会第47届会议正在召开中，在美国的唆使下，加拿大日前挑头发起新疆调查，中国代表当场与之展开激烈交锋并在后续连续出击。29日，中国代表团再次点名美英等国，就其严重现代奴役和贩卖人口现象表示严重关切。"},{"type":"text","value":"据中国常驻联合国日内瓦办事处和瑞士其他国际组织代表团网站29日消息，中国代表团在人权理事会第47届会议与贩卖人口问题特别报告员互动对话时发言，全文如下："},{"type":"text","value":"主席女士："},{"type":"text","value":"贩卖人口严重侵犯人权，各国应严厉打击，并向受害者提供保护。中国对美国、英国等国存在严重现代奴役和贩卖人口现象表示严重关切。过去5年，每年被贩卖至美国从事强迫劳动的人口多达10万人，其中一半被贩卖到“血汗工厂”或遭受家庭奴役。据报道，2018年约有136,000人被贩卖到英国，不少被贩卖者包括妇女和儿童因交通工具条件恶劣等原因死亡。国际社会应关注美国、英国的贩卖人口问题，敦促其采取有效措施加以解决。"},{"type":"text","value":"中方对特别报告员基于虚假信息和拙劣谎言，对中国无端指责表示坚决反对。希望特别报告员摒弃对中国偏见，以负责任的态度公正、客观履职。"},{"type":"text","value":"谢谢主席女士。"},{"type":"text","value":"中国常驻联合国日内瓦办事处和瑞士其他国际组织代表团网站截图"},{"type":"text","value":"此前一天（6月28日），在与跨国公司和人权问题工作组对话时，中国常驻联合国日内瓦代表团蒋端公使就表示，中方坚决反对美国等以人权为借口，肆意抹黑中国企业，不择手段制裁打压，企图压制中国企业发展，维护美国科技垄断地位和不正当商业利益。"},{"type":"text","value":"美国有关行径明显违反其自我标榜的公平竞争原则。美国自身强迫劳动现象严重。每年被贩卖至美国从事强迫劳动的人员多达10万人，其中一半被贩卖到血汗工厂，或遭受家庭奴役。强迫劳动在美国家政、农业、种植等20多个行业尤为突出。中方敦促人权理事会关注美国强迫劳动问题。"},{"type":"text","value":"6月28日，中国代表在联合国会上连续出击，就加拿大对土著儿童的残害提出严厉批评，还指出美国、加拿大等西方国家曾犯下严重的种族灭绝罪行，并呼吁国际社会对此发起全面调查。"},{"type":"text","value":"当天，中国代表还与韩国代表一同，严厉驳斥了日本代表称关于日本军队在二战期间强征“慰安妇”说法系编造的故事等表态。"},{"type":"text","value":"根据联合国官网显示，联合国人权理事会第47次会议于6月21日召开，7月13日结束。"},{"type":"text","value":"会议召开的第二日（22日），加拿大在美国的唆使下，挑头呼吁中国允许“人权高专在内的独立观察员”前往新疆，调查所谓“大规模拘押穆斯林”的现象。"},{"type":"text","value":"中国代表随即与其展开了激烈交锋。中方反对加拿大及其盟友借炒作人权干涉内政，共有超过90个国家以不同方式表达对中国正当立场的理解和支持。"},{"type":"text","value":"我外交部发言人汪文斌在28日的外交记者会上表示。“挺华国家数量目前还在持续增加。事实胜于雄辩，公道自在人心。少数国家借人权问题干涉中国内政只会自取其辱。"},{"type":"text","value":""},{"type":"text","value":""},{"type":"text","value":"延伸阅读："},{"type":"text","value":"加拿大发现数量震惊无名坟墓还忙着联合40多国攻击中国 赵立坚3问连怼加拿大"},{"type":"text","value":"【文/观察者网 刘程辉】215具原住民儿童尸骸一事尚未平息，加拿大种族迫害的又一悲剧浮出水面。"},{"type":"text","value":"据多家外媒报道，加拿大一个原住民组织当地时间23日宣布了一项“可怕和令人震惊的发现”：他们在另一处寄宿学校旧址发现了数百个无名坟墓，其中的尸骸以儿童为主。"},{"type":"text","value":"该组织表示，新发现坟墓的数量打破了加拿大以往的纪录，但并未说明具体是多少。他们将在不久后召开发布会提供更多细节。"},{"type":"text","value":"值得注意的是，这是加拿大一个月内第二次在寄宿学校旧址发现无名坟墓。5月28日，位于不列颠哥伦比亚省的一所原住民寄宿学校旧址发现了215具儿童遗骸，引发外界震惊。"},{"type":"text","value":"就在本次发现的前一天（22日），包括中国在内的多国在联合国人权委员会呼吁，对加拿大在原住民身上犯下的罪行进行独立调查。"},{"type":"text","value":"而加拿大呢，忙着代表40多国发言造谣新疆问题，呼吁中国允许“人权高专在内的独立观察员”前往新疆，调查所谓“大规模拘押穆斯林”的现象。中国外交部发言人赵立坚23日反问加方，针对原住民儿童的人权侵犯调查何时开展？补偿何时落实？何时出台针对种族歧视的系统性措施？"},{"type":"text","value":"美国AXIOS新闻网报道，配图为本月初人们在渥太华纪念215名原住民遇难儿童"},{"type":"text","value":"加拿大再现无名墓，数量打破纪录"},{"type":"text","value":"据美国《华盛顿邮报》报道，当地时间23日，代表萨斯喀彻温省74个原住民群体的“主权原住民联盟”发表声明称，在距离省首府里贾纳约140公里的马里瓦尔印第安寄宿学校（Marieval Indian Residential School）旧址，发现了数百座“可怕的”无名坟墓。尽管声明没有提到确切的坟墓数量，但称这是“加拿大迄今为止数量最多的”，这表明其数目要比上个月发现的215具儿童遗骸更多。"},{"type":"text","value":"报道形容，这起一个月内的第二期“可怕的发现”，让加拿大再度面对“历史上最黑暗的一页”。"},{"type":"text","value":"《华盛顿邮报：加拿大另一处寄宿学校旧址发现无名坟墓》"},{"type":"text","value":"马里瓦尔印第安寄宿学校始建于1899年，和上月发现儿童遗骸的寄宿学校一样，在历史上大部分时间都由加拿大天主教会运营。虽然这所学校在1997年关闭，随后不久便被拆除，但地面上仍留下了坟墓的标记。根据就读过这所学校的学生证词及档案材料，加拿大和解与真相委员会曾把该校列为可能存在无名坟墓的地点，直到这些坟墓日前被真正发现。"},{"type":"text","value":"马里瓦尔印第安寄宿学校历史照（图自加媒）"},{"type":"text","value":"虽然“主权原住民联盟”在声明中没有提供关于这一发现的更多具体信息，但联盟主席鲍比·卡梅伦（Bobby Cameron）称，他们将在当地时间24日的发布会上具体谈论这件事，同时还会公布现场的视频和图片记录。"},{"type":"text","value":"“围绕这件事有着各种议论和猜测，看看坟墓的数量吧——这是个相当大的数字。这事很艰难，也令人痛苦和心碎。”卡梅伦说。"},{"type":"text","value":"加拿大原住民组织第一民族大会全国酋长佩里·贝勒加德（Perry Bellegarde）通过社交平台表示，这起最新的发现“绝对是一起悲剧”，但“并不奇怪”。他敦促所有加拿大人“在这个及其困难和情绪化的时刻，与原住民站在一起”。"},{"type":"text","value":"另据美国有线电视新闻网（CNN）报道，与此同时，萨斯喀彻温省当地官员正在联系幸存者和家属，向他们通报这次发现的情况。"},{"type":"text","value":"在接受加拿大CTV新闻网采访时，加尼托巴大学副教授尼安詹姆斯·辛克莱（Niigaan James Sinclair）表示，这次的最新发现证实了当地社区几十年来的的流言。"},{"type":"text","value":"辛克莱回忆说，2015年，加拿大真相与和解委员会曾邀请过联邦政府调查寄宿学校地点，但联邦政府拒绝这么做。很多社区不得不靠自己的力量花了很长时间才找到自己孩子的尸骸。"},{"type":"text","value":"“加拿大人并未准备好接受这个国家的现实”"},{"type":"text","value":"自上月加拿大不列颠哥伦比亚省一处印第安人寄宿学校发现215具儿童遗骸后，加拿大对原住民实施迫害的“黑历史”引发外界广泛关注和抨击。多家媒体及加拿大原住民团体认为，这些儿童骸骨或是“冰山一角”，呼吁加拿大政府继续搜寻遗骸。"},{"type":"text","value":"22日，中国常驻日内瓦代表团公使蒋端在联合国人权委员会上，代表多国宣读联合声明，要求对上月加拿大一所寄宿学校发现的200具儿童骸骨，及加拿大对原住民犯下的罪行进行独立调查。"},{"type":"text","value":"“我们呼吁，对所有针对原住民，特别是儿童的犯罪，进行彻底、公正的调查，让该为其负责的人接受法律审判，并为受害者提供充分的救济。”"},{"type":"text","value":"被强行送入寄宿学校的印第安儿童（图自加拿大图书档案管理系统）"},{"type":"text","value":"根据加拿大真相与和解委员会2015年发布的一份报告，加拿大的住宿学校强制让原住民的孩童和家人分开，许多儿童在寄宿学校里遭受身体虐待甚至性虐待，学校强迫他们放弃自己的传统和语言，实际上构成了“文化种族灭绝”。"},{"type":"text","value":"委员会确认，共有超过4100名原住民儿童因受学校迫害而死去，其比例远远高于非原住民儿童。这些儿童常常死于不洁的生活环境、火灾或是其他事故，还有一些儿童在逃离学校时失踪了。出于省钱的目的，孩子们的尸体往往不会被学校送还给家属，而是草草埋在学校或是附近的无名坟墓中。"},{"type":"text","value":"美国《纽约时报》：原住民保留地的两处天主教堂发生火灾"},{"type":"text","value":"值得注意的是，在外界持续施压调查之际，加拿大两座原住民保留地的天主教堂却在21日因失火而焚毁。美国《纽约时报》称，这两座教堂所在地距离上个月发现儿童遗骸的地点并不远，教堂都主要由木头建造，已有一百多年的历史。"},{"type":"text","value":"尽管当地警方并没有明示火灾是人为所致，但当地消防队长表示，他的队伍在教堂烧焦的废墟外发现了液体助燃剂。"},{"type":"text","value":"更令人担忧的是，随着更多发现浮出水面，遭迫害的原住民儿童数量还在持续增长。有加拿大官员表示，在寄宿学校中死去或失踪的儿童总数可能永远是个谜。"},{"type":"text","value":"在一份声明中，萨斯喀彻温省省长斯科特·莫（Scott Moe）预测，其他地方可能还会发现更多的儿童遗骸。“可悲的是，随着寻找坟墓工作的推进，萨斯喀彻温省其他原住民也将经历同样的震惊和绝望。”"},{"type":"text","value":"“这个国家的每个原住民社区都有孩子失踪的故事，以及孩子上学后就此失踪的经历。”加尼托巴大学副教授尼安詹姆斯·辛克莱说，“我认为加拿大人之所以对这件事感到惊讶，是因为他们还没准备好接受这个国家的现实——一个半世纪以来，这个国家对原住民犯下了滔天罪行。”"},{"type":"text","value":"(原标题：中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题)"},{"type":"text","value":"(责任编辑：袁艺娇_NB14956)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:41.000+0000",
      submitedTime: "2021-07-09T17:56:41.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:41.000+0000",
      reason: "已发布",
      articleId: 1413441433536434200,
      images: "group1/M00/00/03/wKgCIWDoHVeANc83AANDLpSCuCE.f348a9",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6464,
      userId: 1102,
      title: "第6天仍有149人失踪，美媒：走程序慢到像在杀人",
      content:
        '[{"type":"text","value":"【文/观察者网 周弋博】"},{"type":"text","value":"美国佛罗里达州瑟夫赛德镇公寓倒塌事故救援工作已来到第6天，当地时间29日，救援人员在大楼废墟新发现一具尸体，事故死亡人数已上升至12人，仍有149人行踪不明。"},{"type":"text","value":"截至目前，未能再找到任何幸存者。多家媒体分析认为，这起事故最终可能成为美国历史上最严重的建筑倒塌事故。"},{"type":"text","value":"美国全国广播公司（NBC）评论称，此次事故反映了美国“现有体制上的不足”——“明明每一分钟对拯救生命都如此珍贵，我们却无法跨州市调用资源，这简直就是在杀人”，从事故发生到救援队到位，足足花了16个小时“走程序”。"},{"type":"text","value":"美国时政媒体《佛罗里达人》（The Floridian）指出，这场事故也成了政客攻讦对手的武器，佛罗里达州民主党州长候选人尼基·弗里德就借着这个由头连续抨击共和党州长罗恩·德桑蒂斯，试图为自己的竞选谋取优势。"},{"type":"text","value":"美国全国广播公司（NBC）报道截图"},{"type":"text","value":"“他们必须缓慢而有条理地行动”"},{"type":"text","value":"在此次事故救援中，佛州派出8个搜救工作队、约370人参与这次救援，该州官员称这是该州历史上除了2018年飓风灾难以外派出救援规模最大的一次。佛州州长德桑蒂斯28日在记者会上称赞现场搜救人员，称他们已连续工作100多个小时。他强调，搜救不会停止。"},{"type":"text","value":"但是救援进展却十分缓慢，不少失踪者家属跟媒体反映对于目前的搜救进展非常“愤怒而且失望”。当地官方对此给出的说法主要是为了“保证安全”。"},{"type":"text","value":"据路透社此前消息，27日，事故废墟中曾发生大火。戴德县县长卡瓦称，大火引起的烟雾是搜救行动最大的障碍。她说，搜救人员在废墟之下不间断地工作，通过使用泡沫、水和其他方法来控制火情，并最大程度地减少烟雾在瓦砾碎片中蔓延，大火直到28日早晨才扑灭。"},{"type":"text","value":"此外，佛罗里达州参议员卢比奥在参观现场后辩解说：“废墟里有各种各样的东西，从有毒化学物质到火、烟，还有各种各样的其他危险无知。他们必须非常小心。如果他们移走这里的一根钢筋，剩下的部分可能会坍塌到其他地方，要么伤害到救援人员，要么伤害到仍在下面的幸存者。”"},{"type":"text","value":"戴德县消防部门负责人康明斯基则表示，他们仍对找到生者抱有希望，但他们必须缓慢而有条理地行动。"},{"type":"text","value":"“碎片散落各处，而且非常紧密，非常紧密，”康明斯基说道。“我们要确保我们有机会找到幸存者。这就是为什么我们不能随意行动，因为那样可能会产生最坏的结果。我们必须确保万无一失”。"},{"type":"text","value":"事故救援现场 视频截图"},{"type":"text","value":"“这简直就是在杀人”"},{"type":"text","value":"不过，也有观点指出，救援受阻的另一个原因其实是“美国现有体制问题”。"},{"type":"text","value":"据美国全国广播公司29日消息，倒塌事故发生后，美国联邦应急管理局（FEMA）几乎立即做好了救援准备，但一直碍于未得到佛州州长的批准而无法行动。"},{"type":"text","value":"据报道，事故发生在24日凌晨1：30左右，而佛州州长德桑蒂斯直至下午5点30分左右才发布相关声明，允许救援队伍赶往事故现场。"},{"type":"text","value":"换言之，光是让救援工作“走程序”事故受害者们就等了足足16个小时，此后直到27日，8个州级搜救队才全部到位。"},{"type":"text","value":"《华盛顿邮报》记者曾公开质疑德桑蒂斯，为何发布派驻救援力量的声明需要花上接近一天的时间。"},{"type":"text","value":"佛州州长办公室辩称，如果没能等到迈阿密市政当局发布的事故声明，州政府也没法独立推进救援工作，而州级的声明其实是是在迈阿密发布声明的1小时后发布的。"},{"type":"text","value":"报道指出，佛州的自治市保有较高自治权，美国各州与联邦政府之间的情况也差不多，这导致大规模伤亡灾难出现后，很多地方必须要先完成非常耗时的“官僚步骤”（bureaucratic steps）才能行动，以避免各级政府出现越权情况。"},{"type":"text","value":"报道评论称，由于美国地方-州-联邦的分歧，美国根本无法保证对大型灾难做出快速有效的反应，“迈阿密发生的悲剧似乎反映了我们现有体制的不足之处。”"},{"type":"text","value":"既然跨州市寻求支援如此困难，那为什么不靠自己的力量开展行动呢？报道指出，毫无实际经验的民选官员根本无法完成这项任务。"},{"type":"text","value":"“明明每一分钟对拯救生命都如此珍贵，我们却无法跨州市调用资源，这简直就是在杀人。”"},{"type":"text","value":"事故搜救现场 社交媒体截图"},{"type":"text","value":"“是一场灾难，不是一场选举”"},{"type":"text","value":"在本次事故救援工作与整个美国的救援体制面临困境之时，美国的政客们仍在忙着借题发挥攻击竞选对手。"},{"type":"text","value":"据美国时政媒体《佛罗里达人》报道，迈阿密住宅楼倒塌事故发生不久后，佛罗里达州民主党州长候选人尼基·弗里德就开始借此攻讦共和党州长德桑蒂斯。"},{"type":"text","value":"事故发生的第二天，德桑蒂斯前往佛州边境参加一场执法人员送别仪式，弗里德趁机“阴阳怪气”了起来。"},{"type":"text","value":"“我真是遭不住了……佛罗里达州这边真的发生了紧急情况，但罗恩却只想着上福克斯新闻的直播，所以今天他就做这些事？”"},{"type":"text","value":"报道指出，弗里德提到了福克斯新闻，却有选择性的没有提及德桑蒂斯在福克斯新闻节目中讨论了迈阿密事故的搜救工作。"},{"type":"text","value":"此外，德桑蒂斯当天下午的大部分时间都会前往事故现场处理相关工作，弗里德依旧只字未提。"},{"type":"text","value":"报道分析称，弗里德已将这次事故“政治化”，试图将此作为与共和党人竞争的政治筹码。"},{"type":"text","value":"对于政客们借题发挥的现象，美国时政杂志《国家评论》（National Review）评论称，这起事故“是一场灾难，不是一场选举”，“并非一切事物都和意识形态相关”。"},{"type":"text","value":"本文系观察者网独家稿件，未经授权，不得转载。"},{"type":"text","value":"(原标题：第6天仍有149人失踪，美媒：走程序慢到像在杀人)"},{"type":"text","value":"(责任编辑：袁艺娇_NB14956)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:40.000+0000",
      submitedTime: "2021-07-09T17:56:40.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:40.000+0000",
      reason: "已发布",
      articleId: 1413441424799699000,
      images: "group1/M00/00/03/wKgCIWDoHVaAayM5AABfzlYkhRI.2efcff",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6463,
      userId: 1102,
      title: "美议员再推涉港法案，去年曾被反华议员克鲁兹力阻",
      content:
        '[{"type":"text","value":"【文/观察者网 王恺雯】香港国安法实施一周年之际，一批美国政客果然又按捺不住了。"},{"type":"text","value":"当地时间6月29日，美国国会民主党众议员汤姆·马利诺夫斯基（Tom Malinowski）和共和党众议员亚当·金辛格 （Adam Kinzinger）重提“香港人民自由与选择法案”（Hong Kong People’s Freedom and Choice Act of 2021），试图为乱港分子在美寻求“庇护”提供便利。"},{"type":"text","value":"去年12月，这一法案在美国参议院闯关失败，而投下反对票的正是老牌反华议员泰德·克鲁兹（Ted Cruz），其理由则是担心放宽移民标准有利于中国向美“派遣间谍”。"},{"type":"text","value":"民主党众议员汤姆·马利诺夫斯基 会议视频截图"},{"type":"text","value":"据香港《南华早报》报道，马利诺夫斯基和金辛格29日举行简报会，宣传有关涉港法案。"},{"type":"text","value":"根据马利诺夫斯基议员网站发布的新闻稿，“香港人民自由与选择法案2021”将为“受到中国政府镇压”的香港人提供庇护，为所谓的“香港企业家、科学家及学者”提供一条通往“美国的捷径”。"},{"type":"text","value":"该法案的具体行动包括，为已经身处美国、一旦被迫返港会“面临迫害”的香港人提供“临时保护身份（TPS）”；加速处理香港人为“逃避迫害”而提出的“难民”申请；继续对香港人实行有别于中国内地的待遇；继续与盟友进行协调，帮助香港人“逃离迫害”；加速接纳香港的高技能人才。"},{"type":"text","value":"这项法案由美国国会众议院20多名议员联合发起，民主党人和共和党人皆参与其中。"},{"type":"text","value":"据《南华早报》报道，金辛格29日表示，他有信心该法案会成为法律，即使两党之间在信仰上有很多分歧，但在香港问题上，“我们完全团结一致”。"},{"type":"text","value":"共和党众议员亚当·金辛格 会议视频截图"},{"type":"text","value":"其实，早在2020年12月7日，美国众议院两党就已通过“香港人民自由和选择法案”，但10天后（12月18日），该法案在参议院闯关失败，让一众乱港分子大失所望。而投下反对票的竟是常年为他们摇旗呐喊的老牌反华议员、共和党人克鲁兹。"},{"type":"text","value":"当时，克鲁兹指责民主党人试图利用该法案推进自己的政治议程，达到改变美国移民政策的目的。而他则“担忧”，放宽的移民标准可能成为漏洞，让中国利用这些向美国“派遣间谍”。"},{"type":"text","value":"《南华早报》称，在美国国会，两党基本一致认为有必要支持香港的“民主”，但对放宽香港移民的问题存在分歧。"},{"type":"text","value":"被问及这次是否依然会阻止涉港法案，克鲁兹办公室没有做出回应。"},{"type":"text","value":"共和党参议员 克鲁兹 图源：澎湃影像平台"},{"type":"text","value":"值得注意的是，“香港人民自由与选择法案2021”的大部分内容都包括在即将在6月30日审议的“确保美国全球领导力地位和参与法案（Ensuring American Global Leadership and Engagement Act）”（俗称“鹰法”，Eagle Act）中。"},{"type":"text","value":"但上述试图遏制中国的“一揽子”法案由民主党人牵头，路透社29日指出，由于两党在如何应对中国方面存在分歧，众议院共和党人已明确表示反对该法案，他们认为“鹰法”要求进行太多研究，将错失采取行动的机会。这也就意味着，本周众议院外交事务委员会可能在只有民主党支持的情况下推进这一法案。"},{"type":"text","value":"马利诺夫斯基称，为了确保“香港人民自由与选择法案”尽快实现，他和金辛格已提出将其作为独立法案，声称此举能为该法案的通过提供另一条途径。"},{"type":"text","value":"对于这份所谓的“香港人民自由与选择法案”，中国外交部发言人华春莹去年就已回应：“美国这些人口口声声关心香港民众的自由，这是假的。他们以香港为由，或者说以所谓的民主自由为名来遏制打压中国，借香港问题来遏制中国的发展壮大，这才是真的。”"},{"type":"text","value":"本文系观察者网独家稿件，未经授权，不得转载。"},{"type":"text","value":"(原标题：美议员再推涉港法案，去年曾被反华议员克鲁兹力阻)"},{"type":"text","value":"(责任编辑：袁艺娇_NB14956)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:39.000+0000",
      submitedTime: "2021-07-09T17:56:39.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:39.000+0000",
      reason: "已发布",
      articleId: 1413441416033603600,
      images: "group1/M00/00/03/wKgCIWDoHVWAJJA4AAF1dVSKAmU.12ec9d",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6462,
      userId: 1102,
      title: "史上首次！日本联合印度在东海搞小动作 | 京酿馆",
      content:
        '[{"type":"text","value":"日印两国军演，背后针对的是中国。"},{"type":"text","value":"▲当地时间6月15日，日本东京，日本立宪民主党等4个在野党联合向众议院提交对菅义伟内阁的不信任决议案。/图片来源：IC Photo文|徐立凡据共同社报道，日本海上自卫队30日宣布，补给舰“滨名”号6月29日在东海与印度海军轻型护卫舰“契尔丹”号实施了海上补给的训练。日印两国在东海进行联合训练实属罕见。双方虽然出动的军事力量有限，但训练地点显然是刻意选择的。日印究竟在打什么算盘？安倍晋三政治遗产促成此次训练据报道，日印搞这次联合训练的理由，是日印两国政府去年签署的《物资劳务相互提供协定》（ACSA）将于近期生效。《物资劳务相互提供协定》是日本前首相安倍晋三留下的政治遗产。2019年日印在外长防长“2+2”安全会谈上达成共识，日本自卫队和印军将共享防务能力和供给，包括燃料和弹药。双方原本商定把这个协议作为日印军事关系升级的礼物，在2019年底安倍访问印度时签署协议。结果安倍将要出访时，他与莫迪原先准备举行会谈的地点印度东北部城市古瓦哈蒂治安恶化。当地居民与警察发生严重冲突导致人员伤亡，安倍就取消了行程。因为治安原因取消首脑会谈，也算是奇事一件。结果这件事拖到去年安倍卸任、菅义伟上台前才办成。ACSA协议是日本主导的协议，目的是加强与盟国的军事合作，为日本自卫队正名。此前，日本已经与美国、澳大利亚、英国、法国、加拿大签署了ACSA。日印ACSA除了允许日本自卫队和印度军队交换使用食品、燃料、弹药、装备零件外，还规定印度海军可以使用日本位于东非吉布提的军事基地，日本自卫队则可以使用位于马六甲出口的印度军事基地。这样一来，日印就建立了准军事同盟关系。"},{"type":"text","value":""},{"type":"text","value":"▲经费紧张，2020年7月26日，日本防卫装备厅首次举办自卫队废弃装备拍卖活动。"},{"type":"text","value":"选择东海训练别有用心日本海上自卫队没有给出日印联合训练的具体地点，但大概率是在钓鱼岛附近海域。菅义伟上台后，为显示强有力领导人的形象，在国际场合频频挑起台海、钓鱼岛议题，并以美日安保机制、美日印澳四国安全机制为依托，带头在东海海域搞事情。今年3月下旬，美国第七舰队旗舰蓝岭号进入东海，日本海上自卫队派出金刚号驱逐舰与蓝岭号举行了联合演习。日本海上自卫队还渲染称，美日联盟“在威慑和对抗威胁的能力方面得以强化”。5月11日，日本主导，美、法、澳三国参加，在东海举行了四国联合军事演习“ARC21”。四国共出动了11艘军舰组成联合舰队，其中日本海上自卫队出了7艘、美国海军1艘、法国海军2艘、澳大利亚海军1艘。这是日美法澳首次在东海进行联合训练。此外，日本陆上自卫队和美国海军陆战队以及法国陆军共160人还在九州地区展开了夺回离岛的联合训练，还假打了一场巷战。日本防卫大臣岸信夫直言不讳地表示，日本要扩大的军事合作关系，不仅包括美日同盟，还包括法国等所谓“志同道合”的国家。此次日印东海联合训练其实与上述日本主导的联合演习是一个用意，就是要显示日本在东海有军事盟友，能招呼人打群架。▲2019年6月26日，特朗普质疑美日安保条约。视频来源：新京报我们视频。同在“四边安全机制”但战略重心不同日印在东海联合搞了这么一场军事秀，是不是表明日印从此就绑到同一架战车上了？虽然日印同在美日印澳的“四边安全机制“内，日印又搞了ACSA“加持”双方的军事联系，但这些机制的价值远没有美日安保机制大。日印两国间并没有安保机制。实际上，对日本积极鼓吹的“四边安全机制”，印度一直没有日美澳三国那么热衷。原因是印度认为其海上战略重点在印度洋方向，不愿意在太平洋方向被美日深度捆绑。日印之间的这种微妙差异也可以从对不同军演的投入中看出来。日本在东海的军演投入不遗余力，而印度则对主要在印度洋海域举行的“马拉巴尔”传统军演不遗余力。去年的“马拉巴尔”军演使“四边安全机制”的美日印澳四国2007年以来凑成了一桌，算是在印度洋方向，“四边安全机制”有了一些实质性的表现。既然如此，印度海军为什么要前往东海与日本搞此次联合训练？一方面，是日本一直在大力拉拢域外国家扩大军事联盟，像法国5月之所以参加“ARC21”，就是因为法国认为自己在印太地区有150万海外居民，也算是印太国家，日本赶紧加以利用。而印度，则是在夏季到来后，又要在中印陆上边界地区搞小动作，也愿意表示一下自己在东海方向有朋友。纠合起来在中国“家门口”显示威武，这种戏码上演很多次了。回应恶意和敌意的最好方法，就是自强。对于日印这次罕见的东海联合训练，可以用中国外交部发言人针对 “ARC21”东海演习的一句话来总结：这些所谓联合军演，对中国一点影响都没有，无非就是多烧他们一点儿油。"},{"type":"text","value":"(原标题：史上首次！日本联合印度在东海搞小动作 | 京酿馆)"},{"type":"text","value":"(责任编辑：袁艺娇_NB14956)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:37.000+0000",
      submitedTime: "2021-07-09T17:56:37.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:37.000+0000",
      reason: "已发布",
      articleId: 1413441407296868400,
      images: "group1/M00/00/03/wKgCIWDoHVOARr3tAAO-ECrCjRQ.67b2d1",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6461,
      userId: 1102,
      title: "中方严重关切美英贩卖人口问题，事实比数据更触目惊心",
      content:
        '[{"type":"text","value":"【文/观察者网 周弋博】"},{"type":"text","value":"在联合国人权理事会第47届会议上，中国代表团就英美严重现代奴役和贩卖人口现象表示严重关切。中方指出，过去5年，每年被贩卖至美国从事强迫劳动的人口多达10万人；据报道，2018年约有13.6万人被贩卖到英国。"},{"type":"text","value":"事实比数据更加触目惊心。"},{"type":"text","value":"2017年，美国得州一辆人贩运输货车被发现“塞进”38人，其中8人被活活闷死；2019年，英国8名人贩子先后拐卖400多人到英国从事高强度劳动，被拐人只能在肮脏狭小的房间生活；2021年，美国佐治亚州检察官曝光贩卖人口链条，指出当地人贩往往“光天化日行动”，使用毒品和暴力控制受害人。"},{"type":"text","value":"据美国公益组织“北极星”统计，2015年全美报告了5714起人口贩卖案件，该数字逐年增加，到2019年时为11500起，已经翻了一倍多。人口贩卖现象在美国由来已久，早在2004年，美国政府公开承认，每年被贩卖至美国的人口在1.45万至1.75万左右，其中70%的女性受害者在被贩卖后受到了性剥削。美国非盈利机构根据美国劳工部收集的数字估计，美国大约有50万名童工。"},{"type":"text","value":"英国内政部曾于2013年表示，全英有超过1万名“现代奴隶制”（人口贩卖、性奴役、强迫劳动）的潜在受害者。英国智库“社会正义中心”分析执法部门数据后指出，目前英国的潜在受害者至少有10万人，真实数字只高不低。"},{"type":"text","value":"美国加利福尼亚大学伯克利分校人权研究中心教授劳雷尔·弗莱彻（Laurel Fletcher）曾表示：“公众普遍认为美国早就解决了现代奴隶制这一问题，但实际上，现代奴隶制依然存在，而且很普遍。它只不过是以一种新的形式出现。”"},{"type":"text","value":"美国明尼苏达州，公益组织北极星（Polaris）布置的反人口贩卖广告牌 图源：视觉中国"},{"type":"text","value":"人口贩卖案件五年翻一倍，美国仍自封“评级最高”国家"},{"type":"text","value":"根据英国内政部2017年发布的报告《英国现代奴隶制类型》中的定义，“现代奴隶制”（Mordern Slavery）是指涵盖了人口贩卖、性奴役、强迫劳动等剥削行为的综合性描述。"},{"type":"text","value":"该报告指出，截至2013年，英国有1万至1.3万名“现代奴隶制”的潜在受害者。"},{"type":"text","value":"致力于解决英国弱势群体权益问题的智库“社会正义中心”（The Center for Social Justice）则认为，考虑到人口贩卖等行为的隐蔽性，受害者的真实数字要比官方给出的人数高得多。"},{"type":"text","value":"该机构援引英国官方数据表示，2018年全英有6895人被确定为“现代奴隶制”受害者，但仅在2019年的前9个月，这个数字就达到了7284人。"},{"type":"text","value":"同时，该机构在相关报告中表示，根据英国执法部门使用的“国家数据分析解决方案 ”（NDAS）估算，目前英国至少有10万名潜在受害者，真实数字只高不低。"},{"type":"text","value":"据路透社报道，2020年全英共有10613名“现代奴隶制”受害者向内政部寻求帮助，许多受害人来自立陶宛、波兰和罗马尼亚等欧盟国家，可能在农场、工厂、建筑工地、性交易或中受到剥削。"},{"type":"text","value":"英国智库“社会正义中心”关于“英国现代奴隶制”的报告截图"},{"type":"text","value":"除了英国，美国的问题同样无法忽视。"},{"type":"text","value":"2004年6月，美国政府发布的《人口贩卖报告》中指出，跨国人口贩卖的受害者中80%是女性，其中70%被贩卖后受到了性剥削，被贩卖到美国的人数在1.45万到1.75万之间。"},{"type":"text","value":"虽然美国政府每年都会发布《人口贩卖报告》，但近年来已不再公布美国的人口贩卖具体受害人数，仅公布已处理的人口贩卖案件数。"},{"type":"text","value":"报告同时宣称，美国已经“完全符合消除人口贩卖的最低标准”，处于报告评分的最高级“Tier1”。"},{"type":"text","value":"报告指出，处于“Tier1”主要考量是否颁布禁止人口贩卖的法律并予以刑事规制、是否对反人口贩卖法律进行大力执行、是否存在识别受害者的系统性措施、是否有向受害者提供必要援助。"},{"type":"text","value":"换言之，“Tier1”仅仅只是意味着美国在打击人口贩卖问题上“很努力”，与其人口贩卖现状是否严重基本无关。"},{"type":"text","value":"美国政府发布的《2020人口贩卖报告》截图"},{"type":"text","value":"联合国专门机构国际劳工组织（ILO）在2016年估计，美国至少有5.57万名“现代奴隶制”受害者正在遭受性剥削或强迫劳动。"},{"type":"text","value":"据美国公益组织“北极星”（Polaris）统计，2015年全美报告了5714起人口贩卖案件，该数字逐年增加，到2019年时为11500起，已经翻了一倍多。"},{"type":"text","value":"美国加利福尼亚大学伯克利分校人权研究中心发布的报告《隐藏的奴隶：美国的强迫劳动现象》中也指出，无论在美国的哪个时期，总有至少有1万人处于“强迫劳动”之中。"},{"type":"text","value":"美国公益组织北极星（Polaris）官方网站截图"},{"type":"text","value":"而美国童工的数据同样触目惊心。"},{"type":"text","value":"据非盈利机构美国农民工机会计划协会根据劳工部收集的数字估计，大约有50万名童工在美国工作。许多儿童从8岁开始工作，每周工作时间长达72小时，每天工作10小时以上的情况并不少见。"},{"type":"text","value":"据《华盛顿邮报》报道，在2003年至2016年期间，美国约有452名儿童死于工伤，包括73名12岁或以下的儿童。而在同一时期，有237名儿童在农业工作时死亡，根据有关组织的报告，这表明在农业中死亡的美国童工比任何其他行业都多。"},{"type":"text","value":"致力于结束美国童工现象的专业工会美国教师联合会（AFT）指出，农业工作对儿童来说是苛刻和危险的，经常接触杀虫剂会大大增加他们患癌症的风险。AFT引用了美国政府问责办公室的一份报告，其中揭露了每年有10万名儿童农场工人在工作中受伤，儿童占农场死亡人数的20%。"},{"type":"text","value":"“这种事情其实一直在发生”"},{"type":"text","value":"2017年7月，美国得州警方在圣安东尼奥一辆重型货车的车厢内，发现38人藏身其中，8人在被发现时已经死亡，其余30人均身患疾病，其中还有两名学龄前儿童。"},{"type":"text","value":"据美联社报道，警方认为这是一起可怕的“人口贩卖”案件。"},{"type":"text","value":"当地消防局长查理斯·胡德指出，二十名情况危急的人员被送往地区医院，另八名状况较轻的病人被送往另一家医院。胡德表示，货车内空调无法工作，非常热，且装满了人。车内的人没有水，几乎所有人都处于脱水和中暑的状态。当时，圣安东尼奥的最高气温达到100华氏度（约37.78摄氏度）以上。"},{"type":"text","value":"当地警方审查监控录像后发现，此前已经有车辆经过并将货车内的部分人接走了，同时货车内还有一些人跑进了附近的林子里。也就是说这台货车之前不止被“塞进”了38人。"},{"type":"text","value":"圣安东尼奥市警察局长威廉·麦克马努斯表示，这些事件不是孤立的，“幸运的是，我们碰到了，而且有人幸存下来，但这种事情其实一直在发生。你可以看到它发生在暗夜中，因为它不想被人发现。”"},{"type":"text","value":"事发现场视频截图"},{"type":"text","value":"“英国规模最大的现代奴隶制案件”"},{"type":"text","value":"2019年7月，英国警方破获当地一起“现代奴隶制”的重大案件。"},{"type":"text","value":"综合《纽约时报》、英国广播公司报道，8名犯罪嫌疑人以丰厚报酬与免费住房为诱饵，从波兰诱骗超过400名流浪汉、前囚犯和酗酒者至英国从事高强度劳动。"},{"type":"text","value":"受害者被送至英国后，被迫从事苦力劳动却几乎没有报酬，他们挤在狭小、肮脏的住所中，生活暗无天日。"},{"type":"text","value":"一位受害者表示，自己在三个多星期里被迫每天工作十多个个小时，但总共只拿到了10英镑（约合人民币89元）的报酬，还要和其他10位受害者一起挤在一间两居室的小房子中居住。"},{"type":"text","value":"报道称，如果有受害者试图报警，还会被人贩子侮辱、威胁或殴打。"},{"type":"text","value":"例如，一名受害者就曾被迫脱光衣服泡在医用碘液中“消毒”，并被告知如不安分听话就会被摘掉肾脏。"},{"type":"text","value":"英国皇家检察署在一份声明中表示，这是“英国规模最大的现代奴隶制案件”，在过去几年中，受害者可能多达400人。"},{"type":"text","value":"检察官指出，这一团伙几年来利用剥削移民攫取了大约300万美元（约合人民币1039万元），并用这些钱购买豪华轿车和其他奢侈品。"},{"type":"text","value":"“现代奴隶制”受害者们被迫居住的房间 社交媒体截图"},{"type":"text","value":"“光天化日下活动，还用毒品和暴力控制受害者”"},{"type":"text","value":"今年6月29日，美国WALB新闻网发布题为《“奥尔巴尼就是中心”：深入调查人口贩卖》一文，曝光佐治亚州奥尔巴尼市的贩卖人口链条。"},{"type":"text","value":"文中援引奥尔巴尼地方检察官格雷格·爱德华兹的话表示，当地的人贩子经常聚集在中心区的酒店、汽车旅馆，光天化日下活动，活动地点主要选在体育场、商场和杂货店。"},{"type":"text","value":"“奥尔巴尼本身就是乔治亚州西南部地区的（人口贩卖）中心。”爱德华兹说道，受害者一般不愿意主动站出来揭露，因为她们往往受到了人贩子的恐吓与桎梏。"},{"type":"text","value":"爱德华兹指出，人贩子的目标主要是年轻女性，往往是三人一组进行行动：一人负责通过聚会等方式引诱女孩上钩，再用毒品和暴力控制对方；一人负责宣传“性交易带来大量财富”，引诱女孩主动上钩；最后一人则扮演成一个温柔男人的角色，专门引诱那些离家出走的女孩，或者诱导和家人有矛盾的女孩们离家“投奔自己”。"},{"type":"text","value":"爱德华兹表示，只要女孩开口接话，基本就会“中招”。"},{"type":"text","value":"奥尔巴尼地方检察官格雷格·爱德华兹 图源：WALB新闻网"},{"type":"text","value":"“实际上现代奴隶制依然存在，而且很普遍”"},{"type":"text","value":"在自身就存在不容忽视的人口贩卖现象的情况下，美英两国仍频频以人权为借口肆意抹黑中国。对此，我国也给予了强硬回击。"},{"type":"text","value":"今年6月15日，中国外交部发言人华春莹在推特发文指出，美国有50万童工，其中许多在烟草行业工作。美国也是唯一一个没有批准联合国儿童权利公约的国家，而在国际劳工组织的8项公约中，美国只批准了2项，排名全球垫底。"},{"type":"text","value":"“除了童工问题，每年还有超过10万人被贩卖到美国从事强迫劳动。在过去的5年里，美国所有50个州和华盛顿特区都报告了强迫劳动和人口贩卖的案件。”"},{"type":"text","value":"公益组织“美国公民自由联盟”（American Civil Liberties Union）在分析美国人口贩卖现象时也指出，随着美国“非正式经济”（即不被现有法律或法规承认、监管或保护的有偿工作）的增长，强迫劳动或人口贩卖的情况也在增长。在美国，强迫劳动和贩运在家政服务、农场、“血汗工厂”工作、餐馆和酒店工作以及性交易行业中最为普遍。"},{"type":"text","value":"美国加利福尼亚大学伯克利分校人权研究中心教授劳雷尔·弗莱彻（Laurel Fletcher）曾表示：“公众普遍认为美国早就解决了现代奴隶制这一问题，但实际上，现代奴隶制依然存在，而且很普遍。它只不过是以一种新的形式出现。”"},{"type":"text","value":"本文系观察者网独家稿件，未经授权，不得转载。"},{"type":"text","value":"(原标题：中方严重关切美英贩卖人口问题，事实比数据更触目惊心)"},{"type":"text","value":"(责任编辑：袁艺娇_NB14956)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:36.000+0000",
      submitedTime: "2021-07-09T17:56:36.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:36.000+0000",
      reason: "已发布",
      articleId: 1413441398505607200,
      images: "group1/M00/00/03/wKgCIWDoHVKAKwC8AAjugiKg-4c.248ef6",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6460,
      userId: 1102,
      title: "李显龙的手写中文祝福，至少说明三件事！",
      content:
        '[{"type":"text","value":"李显龙发来的贺函，只是中国共产党收到的不下1300多封来自外国政要的贺电贺函中的一封，足以证明吾道不孤，大道向前。"},{"type":"text","value":"文 | 海上客"},{"type":"text","value":"“祝贺中国共产党百年华诞！”这是李显龙亲笔手写的一段话。从中，海叔看出了三件值得一观之事。"},{"type":"text","value":"新加坡总理、人民行动党秘书长李显龙01第一，李显龙的亲笔贺函，是新加坡人民行动党与中国共产党之间的一份公开的党际交流文件。李显龙并不是以新加坡总理的身份，而是以人民行动党秘书长的身份发来贺函。这一点，从他选用信笺的抬头上即可看出——马来语、中文、泰米尔语和英文的“人民行动党”字样，以及新加坡人民行动党党徽在列。"},{"type":"text","value":"李显龙向中共中央总书记习近平发出的贺函。 图 | 新加坡《联合早报》李显龙在贺函的开头称呼上，用英语手写“亲爱的习总书记”，也是一种党际交流时的称呼。接下来的正文，大体上是英文印刷体字样。内容主要分三个方面——一方面，在中国共产党建党100周年之际，新加坡人民行动党发来最热烈的祝贺，以此表示有信心中新两国关系将不断加强深化。二方面，李显龙在贺信中表示，在过去100年世界经历巨大而迅速改变的背景下，中国共产党带领中国克服了诸多国内外的挑战，并引导中国走上和平与繁荣的道路。在中国共产党的领导下，中国的发展突飞猛进，无数中国人民的生活水平得以提升。三方面，贺信也写到，中国近年来成功消除绝对贫困，实现全面建成小康社会的目标。此外，中国也成功控制了国内的新冠疫情，为经济强劲复苏铺平道路。十四五期间及至未来，相信中国会变得更美好。然后，李显龙用手写中文写道：“祝贺中国共产党百年华诞！”落款手写英文“你真挚的朋友李显龙”，以及英文的“秘书长”字样。02第二，李显龙所写中文，是简化字。在中国来说，简化字经过几番修正以后，在1986年的《简化字总表》中收录2235字。2000年10月31日，中国的文字法通过，确立了收录这2235个简化字的中文，作为国家通用文字的法定地位。"},{"type":"text","value":"1979年，李光耀在新加坡推行“多讲华语，少说方言”新加坡大体上是在20世纪60年代末开始推行《简体字表》，虽然与中国的简化字方案略有不同——大约有11个新加坡特用的简体字38个与中国简化方式不同的简体字、以及29个偏旁未简化的简体字，但海叔要说，这真称得上是大同小异了。到20世纪70年代末，李显龙的父亲、新加坡国父李光耀开始推行“多讲华语，少说方言”，也就是说，希望新加坡的华人社会少说粤语、闽南语等方言，而采用接近中文普通话的语言，在新加坡称为“华语”。"},{"type":"text","value":"2019年，李显龙在“讲华语运动40周年庆典”上致辞可以说，作为当年亚洲四小龙之一的新加坡，至今仍保持着相当的活力，在四小龙中都仍算最有活力者，这与其看准了中国大陆的改革开放能带之以机会有关。而在语言、文化上，新加坡并不保守。社会上，马来语、中文、泰米尔语和英文都能流行。尽管民间在英语、中文的使用上，也有显得生疏的一方面，但总起而言，能起到交流互通的作用。"},{"type":"text","value":"1965年8月9日，新加坡被迫从马来西亚联邦独立出去海叔要说，在马来西亚，也能看到类似的情况。特别是马来西亚华人社会，对中文的传承延续，某种程度上做得比新加坡更出色。然而，从政府层面来说，不得不佩服李显龙，从其父李光耀当年坚决阻止华语为“新加坡国语”，到其终于改正过来，再到李显龙维持了华语的地位，可见其用心。03第三，新加坡人民行动党成立于1954年，自新加坡独立建国至今，长期执政。回看该党成立时，主要成员为从英国留学回到新加坡的、受英语教育的中产阶级。自组党后开始，李光耀长期为该党领导人。"},{"type":"text","value":"当年意气风发的李光耀从1959年新加坡开始选举政府开始，就由人民行动党主导。1963年至1965年，新加坡属于马来西亚联邦的一部分，人民行动党也登记于马来西亚联邦名下。由于马来西亚联邦其他各邦多由马来人为主，施行马来人优先政策，导致华人占多数的新加坡屡受排挤。新加坡不得不退出马来西亚联邦。而新加坡被逐出马来西亚、不得不独立建国以后，人民行动党带领新加坡人民发展经济，成绩斐然。"},{"type":"text","value":"6月28日，中央对外联络部副部长郭业洲在庆祝中国共产党成立100周年活动第二场新闻发布会上表示，截至6月27日，共收到1300多封中国共产党成立100周年贺电函，其中致贺人包括150多位国家元首、政府首脑，200多位政党的主要领导人。图源 | 国新办网站新加坡人民行动党成立后，曾长期是社会党国际的成员，特别是20世纪60年代，曾是社会党国际执行局成员。然而，1976年，在英国工党和荷兰工党的联合动议下，新加坡人民行动党又不得不退出由西方一些社会党主导的社会党国际。在海叔看来，新加坡人民行动党的遭遇，确实值得一观。在某种程度上说，李显龙向中国共产党百年华诞发来贺函，是新加坡人民行动党对中国共产党的一种理解与尊重。在国际上来说，这次庆祝中国共产党建党100周年，得到的则不仅仅是人民行动党的祝贺。李显龙发来的贺函，只是中国共产党收到的不下1300封来自外国政要的贺电贺函中的一封，足以证明吾道不孤，大道向前……"},{"type":"text","value":"(原标题：李显龙的手写中文祝福，至少说明三件事！)"},{"type":"text","value":"(责任编辑：胡淑丽_MN7479)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:34.000+0000",
      submitedTime: "2021-07-09T17:56:34.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:34.000+0000",
      reason: "已发布",
      articleId: 1413441389747900400,
      images: "group1/M00/00/03/wKgCIWDoHVCAG8cOAAIejjC5Rqw.9461bd",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6459,
      userId: 1102,
      title: "巴铁总理郑重重申！",
      content:
        '[{"type":"text","value":"“我谨代表巴基斯坦政府和人民，向中国兄弟姐妹郑重重申，无论什么时候，巴基斯坦将永远同中国站在一起，作中国最可靠的伙伴、铁杆兄弟和值得信赖的朋友。”"},{"type":"text","value":"当前对于中国和巴基斯坦两国人民是一个历史性的时刻。今年是中巴建交70周年，也是中国共产党成立100周年。在这个具有里程碑意义的时刻，我谨向两国政府和人民致以热烈祝贺。"},{"type":"text","value":"中巴两国人民的历史渊源可以追溯到古代丝绸之路，很多商人、学者、僧人、苦行僧，比如法显和玄奘等，跨越万般凶险的喀喇昆仑山脉相互往来，为中华文明与印度河流域文明的互利交流沟通奠定了基础。"},{"type":"text","value":"巴基斯坦总理伊姆兰·汗（资料图）"},{"type":"text","value":"1950年巴基斯坦在伊斯兰国家中第一个承认中华人民共和国。一年后，两国正式建立外交关系。70年来，我们的兄弟情谊经受住了时间的变迁，不断发展壮大，从未受到地区和国际环境变化的影响。在几代人不懈努力下，我们两国的关系已经提升为全天候战略合作伙伴关系。"},{"type":"text","value":"在这一伟大征程中，巴基斯坦是中国争取在联合国合法权利的最坚定的支持者。巴基斯坦还协助促成1971年美国时任国家安全顾问基辛格 “秘密访华”，那次访问为中美建交打下了重要基础，对东西方关系产生了决定性影响。今年7月，我们将迎来这一开创性访问的50周年纪念日。"},{"type":"text","value":"巴中关系有着深厚的互信、理解和共同利益，这份独特的、经过时间考验的“铁杆”兄弟情谊不断发展，达到一个又一个新高度。我们在涉及对方核心利益问题上相互支持。巴基斯坦始终坚持一个中国政策，在台湾、涉藏、涉疆、涉港、南海等问题上支持中国。中国一贯在巴基斯坦的关键战略、经济和发展要务上与我们站在一起。巴基斯坦人民和政府高度珍视中国在查谟和克什米尔争端上的公正原则立场。"},{"type":"text","value":"巴中友谊深深扎根于两国人民心中。我们有着在遭遇困难时相互支持的优良传统。我们在抗击新冠肺炎疫情方面开展了堪称典范的合作。疫情暴发后，巴方向中方提供了外交和物资支持。2020年3月，阿里夫·阿尔维总统访华，声援中国兄弟姐妹。同样，中国为巴基斯坦抗击疫情提供了重要物资和疫苗支持。中方提供的关键援助，有力帮助了巴基斯坦抗击疫情，挽救了众多宝贵生命。中国抗击疫情的斗争为世界树立了值得效仿的新榜样。"},{"type":"text","value":"1949年以来，中国在人类社会发展的各个领域都取得了举世瞩目的成就。我2018年就任总理以来，已经三次到访中国，有幸得以深入了解中国经济快速发展背后的理念和战略。中国的飞速发展和繁荣，为发展中国家实现经济社会发展进步提供了新范式。"},{"type":"text","value":"巴基斯坦是最早支持和参与习近平主席提出的“一带一路”倡议的国家之一。我们高度认同“一带一路”倡议的精神和理念，支持超越国界搭建合作共赢的桥梁，促进经济融合，构建命运共同体。作为“一带一路”的旗舰项目，中巴经济走廊与巴基斯坦政府“新巴基斯坦”愿景相辅相成。"},{"type":"text","value":"中巴经济走廊是一个具有变革意义的项目。在建设的第一阶段，中巴经济走廊帮助我们消除了重大基础设施建设瓶颈，满足了经济无碍增长的基本能源需求。在70个早期收获项目中，46个已经启动或完成，总投资额达254亿美元，为当地创造了7万个就业岗位。"},{"type":"text","value":"中巴经济走廊上的一个山口 图源：外媒"},{"type":"text","value":"中巴经济走廊建设的第二阶段将聚焦工业化、农业合作、社会民生发展和创造就业。我相信，在双方的共同努力下，我们也将成功推进一号铁路干线项目。瓜达尔港和自贸区的开发建设也取得快速进展，必将促进区域互联互通和经济一体化。"},{"type":"text","value":"“新巴基斯坦”愿景的核心支柱在于地缘经济，致力于通过发展伙伴关系、促进互联互通和维护地区和平，将巴基斯坦转型为一个经济充满活力的国家。我们的目标是，充分调动巴基斯坦地缘经济区位优势和迅速增长的2.2亿人口红利，成为全球经济大熔炉和经济中心。"},{"type":"text","value":"在这一愿景下，巴基斯坦政府在经济的各个领域实施果断而深远的改革，使得我们的国家逐步走上更优质、更包容、更可持续的发展道路。尽管面临新冠肺炎带来的挑战，但巴基斯坦2020-2021财年国内生产总值预计将增长3.94%。"},{"type":"text","value":"为了充分释放巴基斯坦作为地缘经济中心的潜力，我们推出了吸引外国投资的正向激励措施，启动了财政和货币改革，以营造良好的营商环境。我们欢迎中国商人和企业家从相关机制中受益，将巴基斯坦作为建立长久商业联系的首选目的地。"},{"type":"text","value":"中国已成为巴基斯坦的最大外国直接投资国和最大贸易伙伴。中巴自贸协定第二阶段议定书于2020年1月1日正式实施，进一步扩大了双边贸易自由化产品覆盖范围。"},{"type":"text","value":"若国家财富不能惠及社会贫困阶层并实现公平增长，那任何数量的发展都没有意义。我们的发展愿景是消除贫困，让人民成为他们自己命运的主人。在这方面，我们希望从中国在短短40年内使8亿人摆脱贫困的成功实践中汲取灵感。"},{"type":"text","value":"在实现以人民为中心的“新巴基斯坦”愿景过程中，我期待进一步从中国经验中受益。在我同习近平主席、李克强总理的会晤中，双方达成重要共识，一致同意推动双边关系迈上前所未有的高度，开辟经贸、投资、人文交流等合作新领域。高度互信是巴中关系的最根本特征。巴方愿同中方继续深化互信，保持高层交往势头，在核心利益问题上坚定不移相互支持。"},{"type":"text","value":"中国共产党为中国人民和中国和平重返世界政治经济中心作出巨大贡献。在习近平主席高瞻远瞩的领导下，中国人民正走在实现中华民族伟大复兴的道路上。我们真诚希望，在以习近平同志为核心的中国共产党中央委员会鼓舞人心的领导下，中国将在2035年基本实现社会主义现代化、2049年建成富强民主文明和谐美丽的社会主义现代化强国的伟大历史征程上不断迈进。"},{"type":"text","value":"我谨代表巴基斯坦政府和人民，向中国兄弟姐妹郑重重申，无论什么时候，巴基斯坦将永远同中国站在一起，作中国最可靠的伙伴、铁杆兄弟和值得信赖的朋友。让我们携起手来，共同构建新时代更加紧密的中巴命运共同体。"},{"type":"text","value":"祝巴中友谊万岁！"},{"type":"text","value":"（作者为巴基斯坦总理伊姆兰·汗）"},{"type":"text","value":"(原标题：巴铁总理郑重重申！)"},{"type":"text","value":"(责任编辑：胡淑丽_MN7479)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:33.000+0000",
      submitedTime: "2021-07-09T17:56:33.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:33.000+0000",
      reason: "已发布",
      articleId: 1413441380998582300,
      images: "group1/M00/00/03/wKgCIWDoHU-ABZp-AAMrUKSbKWk.9f546f",
      enable: 1,
      authorName: "admin",
    },
    {
      id: 6458,
      userId: 1102,
      title: '太懂得"骗犯规"曾惹怒纽约市长 他是NBA的反派英雄',
      content:
        '[{"type":"text","value":"特雷·杨命中超远三分后，对着尼克斯主场鞠躬庆祝。"},{"type":"text","value":"特雷·杨终究没有能够一黑到底，但是他和亚特兰大老鹰已经超额完成了赛季初的目标——“这个赛季唯一想做的就是证明我们可以赢球。”"},{"type":"text","value":"常规赛场均得到25.3分、3.9个篮板和9.4次助攻，带领老鹰冲上东部第五的位置；季后赛更进一步，场均得到28.8分、2.8个篮板和9.5次助攻，直接杀进东部决赛……特雷·杨在“三年级”交出的这份成绩单已经足够惊艳。"},{"type":"text","value":"只不过，这是一位球迷眼中的“反派领袖”——骗犯规、防守漏洞、滥投，并且性格乖张。一整个赛季，特雷·杨没少受到外界的谩骂、看衰和质疑，但他似乎却很享受这样的氛围。"},{"type":"text","value":"“他（特雷·杨）绝对是我们的引擎，是球队的领袖。”柯林斯的这番评价，也是老鹰队上上下下的共同心声。而这位22岁的“反派领袖”还有更大的野心，“我们打进了季后赛和东部决赛，这很好，但我们想要更多，我们想要打进总决赛，并且赢得总冠军。”"},{"type":"text","value":"特雷·杨让纽约球迷闭嘴。"},{"type":"text","value":"“反派”人设"},{"type":"text","value":"NBA是一个喜欢讲故事的体育联盟，如果把每个赛季看作一个章节，那么都有属于他的英雄和反派。对于特雷·杨来说，这个赛季定义了他的人设——那就是“反派”。"},{"type":"text","value":"在NBA联盟的地标麦迪逊花园广场球馆里，15000名球迷歇斯底里的鼓噪“Fxxk Trea Young”就成了他的人设中最局标志性的注脚。"},{"type":"text","value":"纽约球迷对于特雷·杨的憎恶，也是有理由的——这位22岁的老鹰核心实在太懂得“骗犯规”了——或是刹车式骗犯规，或是跳远式骗犯规，或是自己伸脚让防守者“被迫”放到他，几乎特雷·杨的每一个动作，都能引来纽约主场球迷响彻球馆的谩骂。"},{"type":"text","value":"客观来说，特雷·杨并不是联盟里唯一一个喜欢骗犯规的球员，独行侠的东契奇、太阳的“老炮”克里斯·保罗以及开拓者的利拉德，都时常会祭出类似的杀招，但特雷·杨却成了最招球迷讨厌的那一个。"},{"type":"text","value":"就连纽约市长都气得跳出来隔空与特雷·杨打“口水仗”： “这支老鹰队在纽约上空是飞不起来的，用正确的方式打比赛吧。”"},{"type":"text","value":"特雷·杨成了NBA的“反派”。"},{"type":"text","value":"特雷·杨这种“反派”人设的个中原因并不复杂——用美国媒体《体育画报》的评价来描述，那就是 “他很适应这样的氛围，而且他可以用胜利给对手球迷最致命的还击”。"},{"type":"text","value":"在“下克上”淘汰尼克斯的那个夜晚，特雷·杨做出了一个弯腰鞠躬的动作，并且在社交网络上留下了那句颇为“凡尔赛”的配文——“晚安，纽约”。"},{"type":"text","value":"其实，这个庆祝动作最招的“版权”是属于雷吉·米勒的，1994年常规赛中，当步行者在最后0.8秒完成准绝杀时，他对着公牛球迷做出了极具嘲讽的鞠躬致意。"},{"type":"text","value":"“我就是为这个舞台而生的……他们嘲讽我骂我，但并不能在球场上击败我。”这就是特雷·杨，一个敢于与全世界做对的“大场面球员”。"},{"type":"text","value":"当然，他也为此付出了一些代价——6月中旬公布的本赛季最佳整容中，特雷·杨落榜了。根据ESPN的数据统计，NBA历史上共有三次赛季场均25分和9助攻的球员没能入选，特雷·杨占了其中两次。"},{"type":"text","value":"“他是一个会把所有负能量当作燃料的人。”在柯林斯眼中，特雷·杨就是那种“杀不死他的将使他更强大”的典型代表，“ 那些想继续羞辱他的人，你们请继续，他绝不会为此而困扰的。”"},{"type":"text","value":"东部决赛，特雷·杨踩到裁判的脚扭伤。"},{"type":"text","value":"“今年我只想证明我能带队”"},{"type":"text","value":"如果说，击败东部排名第四的纽约尼克斯，定义了特雷·杨的“反派”人设；那么，淘汰东部排名第一的76人，则证明了这个“反派”具备了超巨的实力。"},{"type":"text","value":"必须承认的是，球队在这个赛季换帅的决定让这只原本低空飞行的老鹰一下子学会了展翅翱翔。"},{"type":"text","value":"在内特·麦克米兰取代劳埃德·皮尔斯之后，老鹰的战绩从前半段的14胜20负到后来的35胜15负。在这些改变之中，特雷·杨的快速成长，同样是老鹰在这个赛季取得巨大成功的关键因素。"},{"type":"text","value":"或许是因为同期的东契奇太过抢眼，又或是特雷·杨的比赛风格太招人讨厌，大多数人主动“忽略”了这位22岁当家球员所取得的成就："},{"type":"text","value":"生涯前11场季后赛场均至少20分5助攻，成为历史第一人；"},{"type":"text","value":"单场18个助攻排在现役球员季后赛助攻记录第四，也是老鹰队史1994年后首位15＋助攻的球员；"},{"type":"text","value":"历史第四位季后赛首秀砍下30分10助攻的球员；"},{"type":"text","value":"“篮球之神”乔丹以后第一位在麦迪逊广场花园连续三场季后赛30+的球员……"},{"type":"text","value":"特雷·杨和恩比德“致意”。"},{"type":"text","value":"这样一组成绩和数据已经能够展现出特雷·杨的个人能力，不过他的价值远不止于这些惊艳的数据。"},{"type":"text","value":"在对阵76人的季后赛第四场，正是特雷·杨在最后时刻的“拉杆传球”找到科林斯，帮助后者命中了逆天改命的三分球，他也借此成为1994年以来首位季后赛单场送出15次以上助攻的老鹰球员。"},{"type":"text","value":"这看似只是所有助攻中的一个，但却改变了整轮系列赛的走势。"},{"type":"text","value":"而到了“抢七大战”，特雷·杨在前三节16投2中，手感冰冷，但面对着身高2米11、体重108公斤的西蒙斯，他却敢于在最后两分钟投出标志的“Logo Shot”，那一刻，他踩着76人的队徽一角，以一记超远三分将分差拉开到6分，并且牢牢将胜利拽在了自己手里。"},{"type":"text","value":"这其实就是领袖该有的样子——在自己被限制的时候，能够帮助队友得分，而到了比赛最关键的时候，他又能挺身而出，带走胜利。"},{"type":"text","value":"“这个赛季，我只想证明我能带队赢球。”特雷·杨的目标很简单，也是希望能够击碎一个又一个质疑，“我记得赛季开始前就有人问过我这个问题。我当时的回答是，我不在乎个人荣誉或者其它任何事情，我只在乎胜利，希望人们能用不同的眼光来看待我。”"},{"type":"text","value":"特雷·杨用自己的方式对抗着质疑。"},{"type":"text","value":"“杨不悔”"},{"type":"text","value":"事实上，按照美国媒体的报道，老鹰队在这个赛季给他们自己的定位原本只是“走好重建的下一步”。"},{"type":"text","value":"球队CEO史蒂夫·库宁在赛季之初给球队定的具体目标是： 打进球队的附加赛，然后争取搭上季后赛末班车，在首轮跟东部的第一或者第二掰掰手腕。"},{"type":"text","value":"结果，特雷·杨就这样超额完成了任务。"},{"type":"text","value":"而从亚特兰大球迷在社交网络上对于球队教练组、球员特别是特雷·杨的鼓励，足以证明他们的努力得到了亚特兰大这座城市的认可。"},{"type":"text","value":"要知道，在NBA球迷眼中，亚特兰大是一座“NBA球星的荒漠”，只有回溯到28年前，球迷才能找到亚特兰大最后一次在常规赛MVP投票中跻身前十的球员——1993年的多米尼克·威尔金斯。"},{"type":"text","value":"“这很奇怪，亚特兰大从来不缺体育明星，但是老鹰队缺少超级巨星已经有很长一段时间了。”这是威尔金斯的真实感受。"},{"type":"text","value":"按照ESPN的说法，这是联盟最长时间的“超级巨星空窗期”，比排在第二位的篮网队还长了整整10年。"},{"type":"text","value":"当然，回顾老鹰过去20多年的历史，乔·约翰逊可以算是一位优秀的“鹰王”的，但作为一名七届全明星球员，他的影响力和话题度太低了，在美国媒体看来，他的“安静程度”都配不上他的能力，他也缺少让球迷印象深刻的微笑和个性，更没有办法把球迷留在亚特兰大的球馆里。"},{"type":"text","value":"根据《体育画报》报道，早些年 更多亚特兰大球迷买票看球是为了能够近距离看到杜兰特、詹姆斯等超级球星，“他们对于主队并没有太多的特殊情感”。"},{"type":"text","value":"在特雷·杨的带领下，老鹰全队非常团结。"},{"type":"text","value":"直到特雷·杨的加入，一切出现了转变。"},{"type":"text","value":"老鹰队CEO库宁表示，特雷·杨的到来让老鹰队青少年球衣的销量增长了12倍，他正在利用自己的影响力与球迷建立亲密的关系，他还借用库里的例子表达对未来的期望："},{"type":"text","value":"“每当金州勇士客场挑战时，我们都会提早开放场馆，好让粉丝们观看库里赏心悦目赛前热身。我们希望杨未来也能激发更多青年球迷的兴趣。”"},{"type":"text","value":"有意思的是，媒体也开始拿特雷·杨和库里作比较—— 在本赛季敢于尝试9米外远投（超过25次出手）的6名球员中只有斯蒂芬·库里（37.4%）的命中率比杨（36.4%）更好。"},{"type":"text","value":"而这一切肯定和赞美都是特雷·杨自己赢回来的。"},{"type":"text","value":"在2018年的选秀之夜，当球队用“欧洲MVP”卢卡·东契奇换回了球迷口中“头发稀疏、骨瘦如柴”的特雷·杨时，不少老鹰球迷还在社交网络上表达着对球队管理层的强烈不满和质疑。"},{"type":"text","value":"但如今，那些质疑者中的大部分已经成了特雷·杨的狂热粉丝，他们在社交网络上骄傲地喊出，“我们有属于自己的球星了”。"},{"type":"text","value":"中国球迷则直接送了特雷·杨一个名字，概括了亚特兰大球迷的感情——“杨不悔”。"},{"type":"text","value":"(原标题：特写｜特雷·杨，NBA的反派英雄)"},{"type":"text","value":"(责任编辑：戴丽丽_NN4994)"}]',
      type: 1,
      channelId: 1,
      labels: "爬虫",
      createdTime: "2021-07-09T17:56:32.000+0000",
      submitedTime: "2021-07-09T17:56:32.000+0000",
      status: 9,
      publishTime: "2021-07-09T17:56:32.000+0000",
      reason: "已发布",
      articleId: 1413441372194738200,
      images: "group1/M00/00/03/wKgCIWDoHU6ABk6aAACyrcxdN7s.ca9d04",
      enable: 1,
      authorName: "admin",
    },
  ];
  total.value = 10;
  currentPage.value = 1;
});
</script>

<style lang="less" scoped>
:deep(header) {
  padding-left: 40px;
  .el-row {
    height: 100%;
  }
  .el-input,
  .el-input__wrapper {
    width: 200px;
  }
}
</style>