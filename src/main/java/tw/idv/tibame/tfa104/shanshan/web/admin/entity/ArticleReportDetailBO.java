package tw.idv.tibame.tfa104.shanshan.web.admin.entity;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import tw.idv.tibame.tfa104.shanshan.web.core.Core;

@Entity
public class ArticleReportDetailBO extends Core{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "articleId")
	private Integer articleId;
	
	@Column(name = "articleReportId")
	private Integer articleReportId;
	
	@Column(name = "memberId")
	private Integer memberId;
	
	@Column(name = "memberName")
	private String memberName;
	
	@Column(name = "memberUsername")
	private String memberUsername;
	
	@Column(name = "articleTitle")
	private String articleTitle;
	
	@Column(name = "articleContent")
	private String articleContent;
	
	@Column(name = "articleReportStatus")
	private Integer articleReportStatus;
	
	@Column(name = "articleReportReason")
	private Integer articleReportReason;
	
	@Column(name = "articleReportDate")
	private Timestamp articleReportDate ;
	
	@Column(name = "caseDone")
	private Date caseDone ;

	public Integer getArticleId() {
		return articleId;
	}

	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}

	public Integer getArticleReportId() {
		return articleReportId;
	}

	public void setArticleReportId(Integer articleReportId) {
		this.articleReportId = articleReportId;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberUsername() {
		return memberUsername;
	}

	public void setMemberUsername(String memberUsername) {
		this.memberUsername = memberUsername;
	}

	public String getArticleTitle() {
		return articleTitle;
	}

	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
	}

	public String getArticleContent() {
		return articleContent;
	}

	public void setArticleContent(String articleContent) {
		this.articleContent = articleContent;
	}

	public Integer getArticleReportStatus() {
		return articleReportStatus;
	}

	public void setArticleReportStatus(Integer articleReportStatus) {
		this.articleReportStatus = articleReportStatus;
	}

	public Integer getArticleReportReason() {
		return articleReportReason;
	}

	public void setArticleReportReason(Integer articleReportReason) {
		this.articleReportReason = articleReportReason;
	}

	public Timestamp getArticleReportDate() {
		return articleReportDate;
	}

	public void setArticleReportDate(Timestamp articleReportDate) {
		this.articleReportDate = articleReportDate;
	}

	public Date getCaseDone() {
		return caseDone;
	}

	public void setCaseDone(Date caseDone) {
		this.caseDone = caseDone;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "ArticleReportDetailBO [articleId=" + articleId + ", articleReportId=" + articleReportId + ", memberId="
				+ memberId + ", memberName=" + memberName + ", memberUsername=" + memberUsername + ", articleTitle="
				+ articleTitle + ", articleContent=" + articleContent + ", articleReportStatus=" + articleReportStatus
				+ ", articleReportReason=" + articleReportReason + ", articleReportDate=" + articleReportDate
				+ ", caseDone=" + caseDone + "]";
	}


}
