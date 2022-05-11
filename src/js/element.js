import Vue from 'vue';
import {
  Button,
  Input,
  Avatar,
  Popover,
  Container,
  Header,
  Main,
  Aside,
  Badge,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Carousel,
  CarouselItem,
  Select,
  Option,
  Tag,
  Timeline,
  TimelineItem,
  Card,
  Pagination,
  Upload,
  Message,
  MessageBox,
  Dialog,
  Radio,
  RadioGroup
} from "element-ui"

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Badge)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;