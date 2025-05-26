class ForbiddenWord < ApplicationRecord
  validates :word, presence: true
end
