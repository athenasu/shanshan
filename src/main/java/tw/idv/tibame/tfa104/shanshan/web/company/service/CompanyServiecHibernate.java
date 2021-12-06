package tw.idv.tibame.tfa104.shanshan.web.company.service;

import java.util.List;

import tw.idv.tibame.tfa104.shanshan.web.company.entity.CompanyVO;

public interface CompanyServiecHibernate {
	
	public Integer register(CompanyVO company);
	public CompanyVO update(byte[]file,CompanyVO company);
	public CompanyVO findByPK(Integer companyId);
	List <CompanyVO> getAll();
	List<CompanyVO> findComByString(String search);

}
