package tw.idv.tibame.tfa104.shanshan.web.participant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import tw.idv.tibame.tfa104.shanshan.web.participant.entity.Participant;
import tw.idv.tibame.tfa104.shanshan.web.participant.service.ParticipantService;

@RestController
@RequestMapping("participant")
@SessionAttributes({ "participant" })
public class ParticipantController {
	@Autowired
	private ParticipantService participantService;
	
	@CrossOrigin
	@PostMapping(path = "addParticipant", consumes = { MediaType.APPLICATION_JSON_VALUE })
	public Integer addParticipant(@RequestBody Participant participant) {
		return participantService.addParticipant(participant);
	}
	
	@CrossOrigin
	@PutMapping(path = "updateParticipant", consumes = { MediaType.APPLICATION_JSON_VALUE })
	public Integer updateParticipant(@RequestBody Participant participant) {
		return participantService.updateParticipant(participant);
	}
	
	@CrossOrigin
	@GetMapping("selectParticipantByMemberId")
	public List<Participant> selectParticipantByMemberId(Integer memberId, Integer eventId){
		final List<Participant> participantListByMemberId = participantService.selectParticipantByMemberId(memberId, eventId);
		return participantListByMemberId;
		
	}
	
	@CrossOrigin
	@PostMapping("deleteParticipantByMemIdEventId")
	public Boolean deleteParticipantByMemIdEventId(@RequestBody Participant participant) {
		return participantService.deleteParticipantByMemIdEventId(participant.getMemberId(), participant.getEventId());
	}
}
