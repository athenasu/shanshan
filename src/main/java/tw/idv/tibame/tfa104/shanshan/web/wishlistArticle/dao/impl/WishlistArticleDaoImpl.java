package tw.idv.tibame.tfa104.shanshan.web.wishlistArticle.dao.impl;

import java.util.List;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import tw.idv.tibame.tfa104.shanshan.web.wishlistArticle.dao.WishlistArticleDao;
import tw.idv.tibame.tfa104.shanshan.web.wishlistArticle.entity.WishlistArticle;
import tw.idv.tibame.tfa104.shanshan.web.wishlistArticle.entity.WishlistArticleBO;

@Repository
public class WishlistArticleDaoImpl implements WishlistArticleDao {

	@Autowired
	private SessionFactory sessionFactory;	
	
	@Override
	public Integer deleteWishlistArticle(WishlistArticle wishlistArticle) {
		Session session = sessionFactory.getCurrentSession();
		session.remove(wishlistArticle);
		return 1;
	}
	
	@Override
	public Integer deleteWishlistArticleByMemIdEventId(Integer memberId, Integer articleId) {
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery(
				"DELETE WishlistArticle " +
				"WHERE memberId =:memberId AND articleId =:articleId"
				)
				.setParameter("memberId", memberId)
				.setParameter("articleId", articleId)
				.executeUpdate();
	}
	
	@Override
	public Boolean addWishlistArticle(WishlistArticle wishlistArticle) {
		Session session = sessionFactory.getCurrentSession();
		Integer id = (Integer) session.save(wishlistArticle); // returns an id
		if (id > 0) {
			return true;			
		} else {
			return false;
		}
	}
	
	@Override
	public List<WishlistArticleBO> findWishlistArticlesByMemberId(Integer memberId) {
		Session session = sessionFactory.getCurrentSession();
		List<WishlistArticleBO> wishlistArticles = session.createNativeQuery(
			"select " +
				"wa.wishlist_article_id as wishlistArticleId, " +
				"a.article_id as articleId, " + 
			    "a.article_title as articleTitle, " +
			    "mtn.mountain_name as mountainName, " +
			    "a.event_date as eventDate, " +
			    "m.member_name as memberName, " +
			    "ap.article_picture as articlePicture, " +
			    "m.member_profile_pic as memberProfilePicture " +
			"from " +
				"article a " +
			    "join wishlist_article wa " +
					"on a.article_id = wa.article_id " +
			    "join article_picture ap " +
					"on a.article_id = ap.article_id " +
				"join mountain mtn " +
					"on mtn.mountain_id = a.mountain_id " +
				"join member m " +
						"on a.member_id = m.member_id " +
			"where " +
				"ap.article_picture_id =( " +
				"select min(article_picture_id) " +
				"from article_picture " +
				"where article_id = ap.article_id " +
				"group by article_id) " +
				"and " +
				"wa.member_id = :id " + 
				"order by wa.wishlist_article_id desc", WishlistArticleBO.class)
				.setParameter("id", memberId)
				.list();
		return wishlistArticles;
	}
	
	@Override
	public List<WishlistArticle> findAllWishlistArticleByMemId(Integer memberId) {
		Session session = sessionFactory.getCurrentSession();
		CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
		CriteriaQuery<WishlistArticle> criteriaQuery = criteriaBuilder.createQuery(WishlistArticle.class);
		Root<WishlistArticle> root = criteriaQuery.from(WishlistArticle.class);
		criteriaQuery = criteriaQuery.where(
				criteriaBuilder.equal(root.get("memberId"), memberId)
				);
		TypedQuery<WishlistArticle> typedQuery = session.createQuery(criteriaQuery);
		List<WishlistArticle> wishlistArticles = typedQuery.getResultList();
		return wishlistArticles;
	}
	
	
}
