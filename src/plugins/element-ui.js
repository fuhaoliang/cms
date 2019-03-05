import Vue from "vue";

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Message,
  MessageBox,
  Loading,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from "element-ui";
// import "element-ui/lib/theme-chalk/index.css"
import "element-ui/lib/theme-chalk//row.css";
import "element-ui/lib/theme-chalk//col.css";
import "element-ui/lib/theme-chalk//button.css";
import "element-ui/lib/theme-chalk//button-group.css";
import "element-ui/lib/theme-chalk//message.css";
import "element-ui/lib/theme-chalk//message-box.css";
import "element-ui/lib/theme-chalk//loading.css";
import "element-ui/lib/theme-chalk//form.css";
import "element-ui/lib/theme-chalk//form-item.css";
import "element-ui/lib/theme-chalk//input.css";
import "element-ui/lib/theme-chalk//input-number.css";
import "element-ui/lib/theme-chalk//radio.css";
import "element-ui/lib/theme-chalk//radio-group.css";
import "element-ui/lib/theme-chalk//radio-button.css";
import "element-ui/lib/theme-chalk//dialog.css";
import "element-ui/lib/theme-chalk//dropdown.css";
import "element-ui/lib/theme-chalk//dropdown-menu.css";
import "element-ui/lib/theme-chalk//dropdown-item.css";

var components = [
  Row,
  Col,
  Button,
  ButtonGroup,
  Message,
  MessageBox,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem
];

components.map(component => {
  Vue.component(component.name, component);
});

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
