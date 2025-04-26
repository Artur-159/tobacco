import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthorizationAPI } from "../../../../services/authorization";
import { setUnblockInfo } from "../../../../store/authorization/slice";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button/button";

const IsBlocked = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { unblockInfo, oneUser } = useSelector((state) => state.authorization);

  const [isBlocked, setIsBlocked] = useState(oneUser?.is_blocked === 1);

  const { handleSubmit, reset } = useForm({
    defaultValues: { ...oneUser.is_blocked },
  });

  useEffect(() => {
    setIsBlocked(oneUser?.is_blocked === 1);
  }, [oneUser]);

  useEffect(() => {
    dispatch(AuthorizationAPI.getOneUser(userId));
  }, [dispatch, userId, unblockInfo]);

  useEffect(() => {
    reset(oneUser.is_blocked);
  }, [reset, dispatch, oneUser, unblockInfo]);

  const onSubmit = handleSubmit(() => {
    dispatch(AuthorizationAPI.postUnblockUser({ user_id: userId }));
    setIsBlocked(false);
  });

  useEffect(() => {
    if (unblockInfo) {
      Toast.success("Հաջողությամբ Ապաբլոկավորել է", false, {
        onClose: () => {
          dispatch(setUnblockInfo(false));
        },
      });
    }
  }, [unblockInfo, dispatch]);

  return (
    <div>
      <MainButton variant="contained" onClick={onSubmit} disabled={!isBlocked}>
        {isBlocked ? "Ապաբլոկավորել" : "Ապաբլոկված է"}
      </MainButton>
    </div>
  );
};

export default memo(IsBlocked);
