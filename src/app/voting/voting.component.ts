import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';
import { PusherService } from '../pusher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  constructor(private pusher: PusherService, private http: HttpClient, private tstr: ToastrService) { }

  event = 'vote';
  vote = '';
  voted = false;
  playerData = [
    {
      name: 'Mo. Salah',
      goals: 30,
      assists: 12,
      shortName: 'salah',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p118748.png',
    },
    {
      name: 'Christian Eriksen',
      goals: 8,
      assists: 13,
      shortName: 'eriksen',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p80607.png',
    },
    {
      name: 'Harry Kane',
      goals: 26,
      assists: 5,
      shortName: 'kane',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p78830.png',
    },
    {
      name: "Kevin De'bruyne",
      goals: 10,
      assists: 17,
      shortName: 'kevin',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p61366.png',
    },
  ];
  voteCount = {
    salah: 4100,
    kane: 7236,
    eriksen: 6325,
    kevin: 3236,
  };

  chartLabels: string[] = Object.keys(this.voteCount);
  chartData: number[] = Object.values(this.voteCount);
  chartType: ChartType = 'doughnut';

  castVote(player: string) {
    this.http
      .post('http://localhost:4000/vote', { player })
      .subscribe((res: any) => {
        this.vote = res.player;
        this.voted = true;
      });
  }

  getVoteClasses(player: string) {
    return {
      elect: this.voted && this.vote === player,
      lost: this.voted && this.vote !== player,
    };
  }

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('vote', (dt: any) => {
      if (dt["player"] == 'salah') {
        this.voteCount["salah"] += 1;
      } else if (dt["player"] == 'kane') {
        this.voteCount["kane"] += 1;
      } else if (dt["player"] == 'eriksen') {
        this.voteCount["eriksen"] += 1;
      } else if (dt["player"] == 'kevin') {
        this.voteCount["kevin"] += 1;
      }
      this.chartData = Object.values(this.voteCount);
      this.tstr.success('You have voted successfully. Only vote for one candidate to avoid disqualification', 'Voting Success');
    });
  }

}
