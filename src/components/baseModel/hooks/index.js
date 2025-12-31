import { ref, unref, reactive, getCurrentInstance, onMounted, nextTick } from 'vue'

export const useModel = () => {
  const modelMethods = ref(null);
  const register = (e) => {
    modelMethods.value = e;
  };

  const methods = {
    openModel: (data) => {
      const instance = unref(modelMethods);
      if (instance && instance.openModel) {
        instance.openModel(data);
      } else {
        console.warn("Modal 实例尚未注册");
      }
    },
    closeModel: () => {
      unref(modelMethods)?.closeModel();
    }
  };

  return [register, methods];
}

export const useModalInner = (callback) => {
  const instance = getCurrentInstance();
  const registerEl = reactive({
    modelValue: false,
    title: '',
    loading: false,
    onClose: (val) => {
      registerEl.modelValue = false;
    }
  })

  const innerMethods = {
    openModel: (data) => {
      registerEl.modelValue = true;
      registerEl.title = data?.title || '';
      callback && callback(data);
    },
    closeModal: () => {
      registerEl.modelValue = false;
    },
    setModalProps: (props) => {
      Object.assign(registerEl, props);
    }
  };

  onMounted(async () => {
    await nextTick();
    const register = instance.attrs.register;
    if (register && typeof register === 'function') {
      register(innerMethods);
    }
  });
  return [
    registerEl,
    {
      setModalProps: innerMethods.setModalProps,
      closeModal: innerMethods.closeModal
    }
  ];
}
