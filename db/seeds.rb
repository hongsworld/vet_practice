#coding:utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user_list = %w[김명향 김민정 김보윤 김상화 김연종 김욱진 김정열 김지운 김태희 나도성 남기웅 남지혜 박상현 박원준 박준영 박지혜 박찬하 박태현 변진호 서유덕 양희선 김수진 김준엽 오다영 우상호 유보경 윤형준 이수범 이승빈 이지은 임주형 임준형 장경호 전다비 정예지 정홍석 조원희 조재호 조희선 지수민 정지원 차용환 최윤정 최정우 허윤하 허희은 이덕원 박지형 이홍석]


user_list.each do |x|
  u = User.create
  u.name = x
  u.password = "0000"
  u.save
end
