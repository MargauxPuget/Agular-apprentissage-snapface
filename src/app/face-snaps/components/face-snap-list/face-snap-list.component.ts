import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps$!: Observable<FaceSnap[]>;

  private destroy$!: Subject<boolean>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

    interval(1000).pipe(
      tap(console.log), // === tap(value => console.log(value))
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
