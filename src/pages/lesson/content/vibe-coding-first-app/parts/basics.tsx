import { CookingPot, FileCode2, Folder, Globe, Languages, Server, Smartphone, Sparkles } from 'lucide-react'
import { useState } from 'react'
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
} from '@/features/slide-deck'

const RAMEN_STEPS = [
  '냄비에 물 550ml를 넣는다',
  '불을 켜고 물이 끓을 때까지 기다린다',
  '면과 스프를 넣는다',
  '4분 30초를 센다',
  '불을 끈다',
  '그릇에 담는다',
]

/** V5. 개발이란 무엇인가 — 컴퓨터는 빠진 것을 채워주지 않는다 */
export function WhatIsDevSlide() {
  const [split, setSplit] = useState(false)

  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>개발이 뭔가요</SlideKicker>
        <SlideHeadline>컴퓨터는 시킨 것만, 시킨 순서대로 합니다</SlideHeadline>
      </div>

      <CompareGrid>
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <PanelLabel>사람에게 시킬 때</PanelLabel>
          <p className="rounded-card bg-surface-base p-4 text-deck-lead font-bold text-content-primary md:p-7">
            &ldquo;라면 좀 끓여줘&rdquo;
          </p>
          <p className="text-deck-body text-content-secondary">
            나머지는 알아서 채워줍니다. 물 양도, 시간도 묻지 않아요.
          </p>
        </Panel>

        <Panel tone="raised" pad="lg" className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PanelLabel tone="accent">컴퓨터에게 시킬 때</PanelLabel>
            <button
              type="button"
              onClick={() => setSplit((value) => !value)}
              className="flex items-center gap-3 rounded-full bg-accent px-4 py-2 text-deck-caption font-bold text-accent-contrast shadow-lifted transition duration-200 ease-deck md:px-7 md:py-3 hover:bg-accent-strong"
            >
              <CookingPot className="size-5 md:size-6" />
              {split ? '되돌리기' : '알아듣게 쪼개기'}
            </button>
          </div>

          {split ? (
            <ol className="animate-pop flex flex-col gap-2">
              {RAMEN_STEPS.map((step, index) => (
                <li key={step} className="flex items-center gap-4 rounded-control bg-surface-overlay px-4 py-2 md:px-6 md:py-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-deck-caption font-bold text-content-strong md:size-10">
                    {index + 1}
                  </span>
                  <span className="text-deck-caption font-semibold text-content-strong">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="rounded-card bg-surface-overlay p-4 text-deck-lead font-bold text-content-strong md:p-7">
                &ldquo;라면 좀 끓여줘&rdquo;
              </p>
              <p className="text-deck-body text-content-secondary">
                물은 몇 ml? 몇 분? 불은 언제 끄죠? — 하나라도 빠지면 거기서 멈춥니다.
              </p>
            </div>
          )}

          <div className="mt-auto flex">
            <Chip>3번을 빼먹으면 끓는 물만 나옵니다</Chip>
          </div>
        </Panel>
      </CompareGrid>

      <SlideNote tone="quiet">
        이 순서를 적어둔 글이 <Mark>코드</Mark>, 적는 일이 <Mark>개발</Mark>입니다
      </SlideNote>
    </SlideLayout>
  )
}

const FILES = [
  { name: 'index.html', role: '글자와 버튼 — 앱의 내용', accent: true },
  { name: 'style.css', role: '색과 크기 — 앱의 디자인', accent: false },
  { name: 'app.js', role: '누르면 반응하는 동작', accent: false },
]

/** V6. 코드는 특별한 게 아니라 글자 파일이다 */
export function CodeIsTextSlide() {
  return (
    <SlideLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <SlideKicker>그럼 코드는 어디에 있나</SlideKicker>
        <SlideHeadline>
          코드는 <Mark>글자가 적힌 파일</Mark>이고, 앱은 그 파일이 모인 폴더예요
        </SlideHeadline>
      </div>

      <div className="grid items-stretch gap-5 md:gap-8 lg:grid-cols-9">
        <Panel tone="sunken" pad="lg" className="flex flex-col gap-4 lg:col-span-5">
          <PanelLabel>내 컴퓨터 어딘가</PanelLabel>
          <div className="flex flex-col gap-3 rounded-card bg-surface-base p-4 md:p-7">
            <p className="flex items-center gap-3 font-mono text-deck-body font-bold text-content-strong">
              <Folder className="size-6 text-accent md:size-7" />
              my-first-app
            </p>
            {FILES.map((file) => (
              <p
                key={file.name}
                className={cx(
                  'ml-8 flex items-center gap-3 font-mono text-deck-caption md:ml-12',
                  file.accent ? 'text-content-strong' : 'text-content-secondary',
                )}
              >
                <FileCode2 className="size-5 text-content-muted md:size-6" />
                {file.name}
              </p>
            ))}
          </div>
          <p className="text-deck-caption text-content-muted">폴더 하나 = 앱 하나. 오늘 이 폴더를 하나 만듭니다</p>
        </Panel>

        <div className="flex flex-col gap-4 lg:col-span-4">
          {FILES.map((file, index) => (
            <Panel
              key={file.name}
              tone={file.accent ? 'accentSoft' : 'raised'}
              pad="md"
              className={cx(
                'flex flex-col gap-2',
                index === 0 && 'animate-rise-1',
                index === 1 && 'animate-rise-2',
                index === 2 && 'animate-rise-3',
              )}
            >
              <p className="font-mono text-deck-body font-bold text-content-strong">{file.name}</p>
              <p className="text-deck-caption text-content-secondary">{file.role}</p>
            </Panel>
          ))}
        </div>
      </div>

      <SlideBody>
        점 뒤에 붙은 <Mark>확장자</Mark>가 그 파일의 역할을 정합니다. 사진이 .jpg인 것과 같아요.
      </SlideBody>
    </SlideLayout>
  )
}

const LANGUAGE_GROUPS = [
  {
    icon: Globe,
    where: '브라우저에서 보이는 화면',
    langs: 'HTML · CSS · JavaScript',
    note: '오늘 쓰는 것 — 브라우저가 그냥 읽습니다',
    today: true,
  },
  {
    icon: Server,
    where: '데이터를 저장하는 서버',
    langs: 'Python · Java · Go …',
    note: '회원 정보, 결제 같은 것',
    today: false,
  },
  {
    icon: Smartphone,
    where: '휴대폰에 설치하는 앱',
    langs: 'Swift · Kotlin',
    note: '앱스토어에 올라가는 것',
    today: false,
  },
]

/** V7. 프로그래밍 언어가 여러 개인 이유 */
export function LanguagesSlide() {
  return (
    <SlideLayout>
      <div className="flex items-center gap-4 md:gap-5">
        <Languages className="size-8 text-accent md:size-11" />
        <SlideHeadline>언어가 많은 건, 만드는 자리가 달라서예요</SlideHeadline>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {LANGUAGE_GROUPS.map((group, index) => (
          <Panel
            key={group.where}
            tone={group.today ? 'accentSoft' : 'raised'}
            pad="lg"
            className={cx(
              'flex flex-col gap-4',
              index === 0 && 'animate-rise-1',
              index === 1 && 'animate-rise-2',
              index === 2 && 'animate-rise-3',
            )}
          >
            <group.icon className={cx('size-8 md:size-10', group.today ? 'text-accent' : 'text-content-muted')} />
            <p className="text-deck-body font-bold text-content-strong">{group.where}</p>
            <p className="font-mono text-deck-caption font-semibold text-content-primary">{group.langs}</p>
            <p className="mt-auto text-deck-caption text-content-secondary">{group.note}</p>
            {group.today ? (
              <div className="flex">
                <Chip tone="accent">오늘 여기</Chip>
              </div>
            ) : null}
          </Panel>
        ))}
      </div>

      <SlideNote>
        <span className="inline-flex items-center gap-3">
          <Sparkles className="size-6 md:size-8" />
          어떤 언어든 결국 &ldquo;순서를 적은 글&rdquo; — 그리고 그 글은 AI가 씁니다
        </span>
      </SlideNote>
    </SlideLayout>
  )
}
