import { ArrowRight, MessageCircle, ThumbsDown } from 'lucide-react'
import {
  Chip,
  CompareGrid,
  cx,
  Mark,
  Panel,
  PanelLabel,
  SlideBody,
  SlideHeadline,
  SlideKicker,
  SlideLayout,
  SlideNote,
} from '../../../deck'
import { TypeThis } from '../../shared'

const VAGUE_RESULT = [
  '일반적인 절차만 줄줄 나옵니다',
  '어느 조합 이야기인지 모릅니다',
  '내 기한도 내 평형도 모릅니다',
]

/** D9. 실습 0-1 · 대충 물어보기 */
export function VagueAskSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>처음 시켜보기 · 1 / 2</SlideKicker>
          <SlideHeadline>먼저 평소 하시던 대로 물어봅니다</SlideHeadline>
        </div>
        <Chip tone="accent">지금 같이 칩니다</Chip>
      </div>

      <div className="grid items-stretch gap-6 md:gap-8 lg:grid-cols-9">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <TypeThis className="animate-rise-1" why="claude.ai에 접속해서 새 대화를 열고 이 한 줄만 칩니다.">
            재건축 평형 신청 어떻게 해?
          </TypeThis>
          <SlideBody>답이 나올 때까지 30초쯤 걸립니다. 다 읽지 마시고 훑어만 보세요.</SlideBody>
        </div>

        <Panel tone="raised" pad="lg" className="animate-rise-2 flex flex-col gap-4 lg:col-span-4">
          <div className="flex items-center gap-4">
            <ThumbsDown className="size-8 text-content-muted md:size-10" />
            <PanelLabel>아마 이렇게 나옵니다</PanelLabel>
          </div>
          <ul className="flex flex-col gap-3">
            {VAGUE_RESULT.map((item) => (
              <li
                key={item}
                className="rounded-card bg-surface-sunken p-3 text-deck-caption font-semibold text-content-secondary inset-shadow-sunken md:p-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto text-deck-caption text-content-secondary">
            틀린 말은 아닌데 제 일에는 쓸 데가 없습니다.
          </p>
        </Panel>
      </div>

      <SlideNote tone="quiet">
        AI가 못해서가 아닙니다 · <Mark>제 사정을 하나도 말해주지 않았기 때문</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const SIX_MAP = [
  { box: '끝나는 지점', line: '신청 기한이랑 필요한 서류만 표로' },
  { box: '읽을 사람', line: '나 혼자 볼 거야' },
  { box: '재료가 있는 곳', line: '조합 공고문을 가지고 있어' },
  { box: '받을 형태', line: '표로' },
  { box: '하면 안 되는 일', line: '공고문에 없는 건 지어내지 마' },
  { box: '다 됐다는 신호', line: '모르는 건 나한테 물어봐' },
]

/** D10. 실습 0-2 · 여섯 가지를 넣어 다시 */
export function SixBoxAskSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <div className="flex flex-col gap-4">
          <SlideKicker>처음 시켜보기 · 2 / 2</SlideKicker>
          <SlideHeadline>같은 질문에 여섯 가지를 얹어 봅니다</SlideHeadline>
        </div>
        <Chip tone="accent">같은 대화창에 이어서</Chip>
      </div>

      <TypeThis
        className="animate-rise-1"
        why="한 줄로 쭉 치셔도 됩니다. 문장이 예쁘지 않아도 괜찮습니다."
      >
        나는 부산 삼익비치 조합원이야. 조합 공고문을 가지고 있어. 신청 기한이랑 필요한 서류만 표로 정리해줘. 공고문에
        없는 건 지어내지 말고, 모르는 건 나한테 물어봐.
      </TypeThis>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
        {SIX_MAP.map((row, index) => (
          <Panel
            key={row.box}
            tone="raised"
            pad="sm"
            className={cx('flex flex-col gap-1', index < 5 ? `animate-rise-${index + 1}` : 'animate-rise-5')}
          >
            <PanelLabel>{row.box}</PanelLabel>
            <p className="text-deck-caption font-semibold text-content-primary">“{row.line}”</p>
          </Panel>
        ))}
      </div>

      <SlideNote tone="quiet">
        방금 친 한 줄에 여섯 가지가 다 들어 있었습니다 · 오늘 내내 <Mark>이 여섯 가지</Mark>만 채우면 됩니다
      </SlideNote>
    </SlideLayout>
  )
}

const DIFF = [
  { head: '아까', body: '누구나 해당하는 일반 절차' },
  { head: '지금', body: '내 조합 · 내 기한 · 내가 낼 서류' },
]

/** D11. 두 답을 나란히 놓고 보기 */
export function CompareAnswerSlide() {
  return (
    <SlideLayout>
      <SlideKicker>처음 시켜보기 · 확인</SlideKicker>
      <SlideHeadline>위로 올려서 두 답을 나란히 봅니다</SlideHeadline>

      <CompareGrid>
        {DIFF.map((side, index) => (
          <Panel
            key={side.head}
            tone={index === 1 ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx('flex flex-col gap-4', `animate-rise-${index + 1}`)}
          >
            <div className="flex items-center gap-4">
              {index === 1 ? (
                <ArrowRight className="size-8 text-accent md:size-10" />
              ) : (
                <MessageCircle className="size-8 text-content-muted md:size-10" />
              )}
              <PanelLabel tone={index === 1 ? 'accent' : 'muted'}>{side.head}</PanelLabel>
            </div>
            <p className="text-deck-lead font-bold text-content-strong">{side.body}</p>
          </Panel>
        ))}
      </CompareGrid>

      <Panel tone="sunken" pad="md" className="animate-rise-3 flex flex-col gap-2">
        <PanelLabel>되물어 왔다면 잘 된 겁니다</PanelLabel>
        <p className="text-deck-caption text-content-secondary">
          “공고문을 올려주시겠어요?”처럼 되묻는다면 시킨 대로 하고 있는 것입니다. 모르는 걸 지어내지 않고 물어보라고
          했으니까요. 다음 순서에서 그 공고문을 넣습니다.
        </p>
      </Panel>

      <SlideNote tone="quiet">
        오늘 하는 일은 전부 이 순서입니다 · <Mark>짧게 시키고 · 결과 보고 · 부족한 걸 더 말해주고</Mark>
      </SlideNote>
    </SlideLayout>
  )
}
