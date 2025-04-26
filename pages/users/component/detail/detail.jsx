import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthorizationAPI } from "../../../../services/authorization";
import { CompanyAPI } from "../../../../services/company";
import { PartnerAPI } from "../../../../services/partner";
import Params from "../../../../helpers/params";
import PageTitle from "../../../../components/page-title/page-title";

const Detail = () => {
  const dispatch = useDispatch();
  const { detailId } = useParams();

  const { oneUser: personalInfo } = useSelector((state) => state.authorization);
  const { image } = useSelector((state) => state.image);
  const { list: companyList } = useSelector((state) => state.company);
  const { partners } = useSelector((state) => state.partner);

  const partnersOrCompany = useMemo(() => {
    const list = personalInfo?.company_id ? companyList : partners;
    return list?.find(
      (item) =>
        item.id === (personalInfo?.company_id || personalInfo?.partner_id)
    );
  }, [personalInfo, companyList, partners]);

  useEffect(() => {
    dispatch(AuthorizationAPI.getOneUser(detailId));
    dispatch(CompanyAPI.getCompanies(Params()));
    dispatch(PartnerAPI.getPartners(Params()));
  }, [dispatch, detailId]);

  return (
    <div>
      <PageTitle className="styles.title" title="Անձնական տվյալներ" />
      <div>
        <div>
          <div>{personalInfo?.name}</div>
          <div>{personalInfo?.email}</div>
          <div>{partnersOrCompany?.name}</div>
          <div>{personalInfo?.phone}</div>
        </div>
      </div>
      <img src={image} alt="User" />
    </div>
  );
};

export default memo(Detail);
