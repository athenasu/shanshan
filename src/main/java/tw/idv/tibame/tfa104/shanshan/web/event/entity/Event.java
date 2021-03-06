package tw.idv.tibame.tfa104.shanshan.web.event.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
//@DynamicInsert
@Table(name = "event")
public class Event implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "event_id")
	private Integer eventId;
	
	@Column(name = "member_id")
	private Integer memberId;
	
	@Column(name = "mountain_id")
	private Integer mountainId;
	
	@Column(name = "event_name")
	private String eventName;
	
	@Column(name = "event_days")
	private Integer eventDays;
	
	@Column(name = "difficulty")
	private Integer difficulty;
	
	@Column(name = "event_deadline")
	private Date eventDeadline;
	
	@Column(name = "event_start_date")
	private Date eventStartDate;
	
	@Column(name = "event_post_date", updatable = false)
	private Timestamp eventPostDate;
	
	@Column(name = "stay_type")
	private Integer stayType;
	
	@Column(name = "min_num_of_people")
	private Integer minNumOfPeople;
	
	@Column(name = "max_num_of_people")
	private Integer maxNumOfPeople;
	
	@Column(name = "assembling_place", columnDefinition = "TEXT")
	private String assemblingPlace;
	
	@Column(name = "event_content" , columnDefinition = "TEXT")
	private String eventContent;
	
	@Column(name = "event_status")
	private Integer eventStatus;
	
	@Column(name = "event_points")
	private Integer eventPoints;
	
	@Column(name = "event_cur_part")
	private Integer eventCurPart;

	public Integer getEventId() {
		return eventId;
	}

	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}

	public Integer getMemberId() {
		return memberId;
	}

	public void setMemberId(Integer memberId) {
		this.memberId = memberId;
	}

	public Integer getMountainId() {
		return mountainId;
	}

	public void setMountainId(Integer mountainId) {
		this.mountainId = mountainId;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public Integer getEventDays() {
		return eventDays;
	}

	public void setEventDays(Integer eventDays) {
		this.eventDays = eventDays;
	}

	public Integer getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Integer difficulty) {
		this.difficulty = difficulty;
	}

	public Date getEventDeadline() {
		return eventDeadline;
	}

	public void setEventDeadline(Date eventDeadline) {
		this.eventDeadline = eventDeadline;
	}

	public Date getEventStartDate() {
		return eventStartDate;
	}

	public void setEventStartDate(Date eventStartDate) {
		this.eventStartDate = eventStartDate;
	}

	public Timestamp getEventPostDate() {
		return eventPostDate;
	}

	public void setEventPostDate(Timestamp eventPostDate) {
		this.eventPostDate = eventPostDate;
	}

	public Integer getStayType() {
		return stayType;
	}

	public void setStayType(Integer stayType) {
		this.stayType = stayType;
	}

	public Integer getMinNumOfPeople() {
		return minNumOfPeople;
	}

	public void setMinNumOfPeople(Integer minNumOfPeople) {
		this.minNumOfPeople = minNumOfPeople;
	}

	public Integer getMaxNumOfPeople() {
		return maxNumOfPeople;
	}

	public void setMaxNumOfPeople(Integer maxNumOfPeople) {
		this.maxNumOfPeople = maxNumOfPeople;
	}

	public String getAssemblingPlace() {
		return assemblingPlace;
	}

	public void setAssemblingPlace(String assemblingPlace) {
		this.assemblingPlace = assemblingPlace;
	}

	public String getEventContent() {
		return eventContent;
	}

	public void setEventContent(String eventContent) {
		this.eventContent = eventContent;
	}

	public Integer getEventStatus() {
		return eventStatus;
	}

	public void setEventStatus(Integer eventStatus) {
		this.eventStatus = eventStatus;
	}

	public Integer getEventPoints() {
		return eventPoints;
	}

	public void setEventPoints(Integer eventPoints) {
		this.eventPoints = eventPoints;
	}

	public Integer getEventCurPart() {
		return eventCurPart;
	}

	public void setEventCurPart(Integer eventCurPart) {
		this.eventCurPart = eventCurPart;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Event [eventId=" + eventId + ", memberId=" + memberId + ", mountainId=" + mountainId + ", eventName="
				+ eventName + ", eventDays=" + eventDays + ", difficulty=" + difficulty + ", eventDeadline="
				+ eventDeadline + ", eventStartDate=" + eventStartDate + ", eventPostDate=" + eventPostDate
				+ ", stayType=" + stayType + ", minNumOfPeople=" + minNumOfPeople + ", maxNumOfPeople=" + maxNumOfPeople
				+ ", assemblingPlace=" + assemblingPlace + ", eventContent=" + eventContent + ", eventStatus="
				+ eventStatus + ", eventPoints=" + eventPoints + ", eventCurPart=" + eventCurPart + "]";
	}


}
