import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const ToggleProps = Utils.extend({
  init: {
    type: Boolean,
    default: true
  },
  checked: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  value: [
    String,
    Number,
    Array
  ]
}, Mixins.colorProps);
export default {
  name: 'f7-toggle',
  props: __vueComponentGetPropKeys(ToggleProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const labelClasses = Utils.classNames('toggle', self.props.className, { disabled: self.props.disabled }, Mixins.colorClasses(self));
    return _h('label', {
      ref: 'el',
      style: self.props.style,
      class: labelClasses,
      attrs: { id: self.props.id }
    }, [
      _h('input', {
        on: { change: self.onChange.bind(self) },
        attrs: {
          type: 'checkbox',
          name: self.props.name,
          disabled: self.props.disabled,
          readonly: self.props.readonly,
          checked: self.props.checked,
          value: self.props.value
        }
      }),
      _h('span', { class: 'toggle-icon' })
    ]);
  },
  watch: {
    'props.checked': function watchChecked(newValue) {
      const self = this;
      if (!self.f7Toggle)
        return;
      self.f7Toggle.checked = newValue;
    }
  },
  mounted() {
    const self = this;
    if (!self.props.init)
      return;
    self.$f7ready(f7 => {
      self.f7Toggle = f7.toggle.create({
        el: self.$refs.el,
        on: {
          change(toggle) {
            self.dispatchEvent('toggle:change toggleChange', toggle.checked);
          }
        }
      });
    });
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el)
      self.f7Toggle.destroy();
  },
  methods: {
    toggle() {
      const self = this;
      if (self.f7Toggle && self.f7Toggle.toggle)
        self.f7Toggle.toggle();
    },
    onChange(e) {
      const self = this;
      self.dispatchEvent('change', e);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};