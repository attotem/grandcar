const tg = window.Telegram?.WebApp;

export const useTelegram = () => {
  const onClose = () => {
    tg?.close();
  };

  const onExpand = () => {
    tg?.expand();
  };

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initData,
    onClose,
    onExpand,
  };
};
